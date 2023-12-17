namespace BoardGames.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string Nick { get; set; }

        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string RefreshToken { get; set; }


    }
}
