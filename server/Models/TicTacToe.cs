namespace BoardGames.Models
{
    public class TicTacToe
    {
        public char[,] Board { get; set; }
        public char CurrentPlayer { get; set; }
        public bool IsGameOver { get; set; }
        public char Winner { get; set; }
    }
}
