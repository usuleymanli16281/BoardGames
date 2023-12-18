using BoardGames.DTO;
using BoardGames.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BoardGames.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public PlayerController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpGet("/player/info/get")]
        public async Task<IActionResult> GetInformation([FromBody] string name)
        {
            var player = await _context.Players.FirstOrDefaultAsync(p => p.Name == name);
            if (player != null)
            {
                return Ok(player);
            }
            return BadRequest("There is a problem, please try again");
        }
        //[HttpPut("/player/info/update")]
        //public async Task<IActionResult> UpdateInformation(string name, [FromBody] PlayerModel newplayer)
        //{
        //    var player = await _context.Players.FirstOrDefaultAsync(p => p.Name == name);
        //    if (player != null)
        //    {
        //        if ((player.Name == newplayer.Name || player.Email == newplayer.Email) || (player.Name == newplayer.Name && player.Email == newplayer.Email) || await _context.Players.FirstOrDefaultAsync(p => p.Name == newplayer.Name || p.Email == newplayer.Email) != null)
        //        {
        //            player.Name = newplayer.Name;
        //            player.Email = newplayer.Email;
        //        }
        //        player.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newplayer.Password);

        //    }
        //}
    }
}
