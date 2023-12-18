using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BoardGames.DTO;
using BoardGames.Models;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("/register")]
    public async Task<IActionResult> Register([FromBody] PlayerModel model)
    {
        try
        {
            var existingPlayer = await _context.Players.FirstOrDefaultAsync(p => p.Email == model.Email || p.Name == model.Name);

            if (existingPlayer != null)
            {
                return BadRequest(new { Message = "Email or Nickname is already registered." });
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

            var newPlayer = new Player
            {
                Name = model.Name,
                Email = model.Email,
                PasswordHash = hashedPassword,
                // Add other properties as needed
            };

            _context.Players.Add(newPlayer);
            await _context.SaveChangesAsync();

            var token = GenerateToken(newPlayer.Email, newPlayer.PasswordHash, newPlayer.Name);


            await _context.SaveChangesAsync();

            return Ok(new { Message = "Registration successful", Token = token });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = "Registration failed" });
        }
    }

    [HttpPost("/login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var player = await _context.Players.FirstOrDefaultAsync(u => u.Name ==  model.Name);

        if (player != null && BCrypt.Net.BCrypt.Verify(model.Password, player.PasswordHash))
        {
            var token = GenerateToken(player.Email, player.PasswordHash, player.Name);


            await _context.SaveChangesAsync();

            return Ok(new { Token = token });
        }

        return Unauthorized(new { Message = "Invalid email or password" });
    }

    private string GenerateToken(string email, string password, string name)
    {
        var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]));
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, name),
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Hash, password)
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var accessToken = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

        return accessToken;


    }
}
