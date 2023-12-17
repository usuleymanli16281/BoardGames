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

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        try
        {
            var existingPlayer = await _context.Players.FirstOrDefaultAsync(p => p.Email == model.Email || p.Nick == model.Nick);

            if (existingPlayer != null)
            {
                return BadRequest(new { Message = "Email or Nickname is already registered." });
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

            var newPlayer = new Player
            {
                Nick = model.Nick,
                Email = model.Email,
                PasswordHash = hashedPassword,
                // Add other properties as needed
            };

            _context.Players.Add(newPlayer);
            await _context.SaveChangesAsync();

            var (accessToken, refreshToken) = GenerateTokens(newPlayer.Email, newPlayer.PasswordHash, newPlayer.Nick);

            newPlayer.RefreshToken = refreshToken; // Store the refresh token securely
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Registration successful", AccessToken = accessToken, RefreshToken = refreshToken });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = "Registration failed" });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var player = await _context.Players.FirstOrDefaultAsync(u => u.Nick == model.Nick);

        if (player != null && BCrypt.Net.BCrypt.Verify(model.Password, player.PasswordHash))
        {
            var (accessToken, refreshToken) = GenerateTokens(player.Email, player.PasswordHash, player.Nick);

            player.RefreshToken = refreshToken; // Update the refresh token
            await _context.SaveChangesAsync();

            return Ok(new { AccessToken = accessToken, RefreshToken = refreshToken });
        }

        return Unauthorized(new { Message = "Invalid email or password" });
    }

    [HttpPost("refresh-token")]
    public IActionResult GenerateRefreshToken([FromBody] RefreshTokenModel model)
    {
        var player = _context.Players.FirstOrDefault(u => u.RefreshToken == model.RefreshToken);

        if (player != null)
        {
            var (accessToken, refreshToken) = GenerateTokens(player.Email, player.PasswordHash,player.Nick);

            player.RefreshToken = refreshToken; // Update the refresh token
            _context.SaveChanges();

            return Ok(new { AccessToken = accessToken, RefreshToken = refreshToken });
        }

        return Unauthorized(new { Message = "Invalid refresh token" });
    }

    private (string AccessToken, string RefreshToken) GenerateTokens(string email, string password,string nick)
    {
        var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]));
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier,nick),
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Hash, password)
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var accessToken = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

        var refreshToken = GenerateRefreshToken();

        return (accessToken, refreshToken);
    }

    private string GenerateRefreshToken()
    {
        
        return Guid.NewGuid().ToString();
    }
}
