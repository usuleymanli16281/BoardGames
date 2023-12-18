using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BoardGames.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public GameController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpGet("/games/{name}")]
        public async Task<IActionResult> GetName([FromBody] string name)
        {
            
            if (name != null)
            {
                return Ok(name);
            }
            return BadRequest("There is a problem in the name of game, please try again");
        }
    }
}
