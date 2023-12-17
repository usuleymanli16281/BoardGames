using BoardGames.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BoardGames.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicTacToeController : ControllerBase
    {
        private TicTacToe _game;

        public TicTacToeController()
        {

            _game = new TicTacToe
            {
                Board = new char[3, 3],
                CurrentPlayer = 'X',
                IsGameOver = false,
                Winner = ' '
            };
        }

        [HttpGet("board")]
        public IActionResult GetBoard()
        {
            return Ok(_game.Board);
        }

        [HttpPost("move/{row}/{col}")]
        public IActionResult MakeMove(int row, int col)
        {
            if (_game.IsGameOver || _game.Board[row, col] != '\0')
            {
                return BadRequest("Invalid move");
            }

            _game.Board[row, col] = _game.CurrentPlayer;

            // Check for a winner
            if (CheckForWinner(row, col))
            {
                _game.IsGameOver = true;
                _game.Winner = _game.CurrentPlayer;
                return Ok(new { Message = $"Player {_game.CurrentPlayer} wins!", Board = _game.Board });
            }

            // Check for a tie
            if (IsBoardFull())
            {
                _game.IsGameOver = true;
                return Ok(new { Message = "It's a tie!", Board = _game.Board });
            }

            // Switch player for the next move
            _game.CurrentPlayer = (_game.CurrentPlayer == 'X') ? 'O' : 'X';

            return Ok(new { Message = "Move successful", Board = _game.Board, CurrentPlayer = _game.CurrentPlayer });
        }

        private bool CheckForWinner(int row, int col)
        {
            // Check the row
            if (_game.Board[row, 0] == _game.CurrentPlayer && _game.Board[row, 1] == _game.CurrentPlayer && _game.Board[row, 2] == _game.CurrentPlayer)
            {
                return true;
            }

            // Check the column
            if (_game.Board[0, col] == _game.CurrentPlayer && _game.Board[1, col] == _game.CurrentPlayer && _game.Board[2, col] == _game.CurrentPlayer)
            {
                return true;
            }


            if ((row == col || row + col == 2) &&
                ((_game.Board[0, 0] == _game.CurrentPlayer && _game.Board[1, 1] == _game.CurrentPlayer && _game.Board[2, 2] == _game.CurrentPlayer) ||
                 (_game.Board[0, 2] == _game.CurrentPlayer && _game.Board[1, 1] == _game.CurrentPlayer && _game.Board[2, 0] == _game.CurrentPlayer)))
            {
                return true;
            }

            return false;
        }

        private bool IsBoardFull()
        {
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    if (_game.Board[i, j] == '\0')
                    {
                        return false;
                    }
                }
            }
            return true;
        }
    }
}
