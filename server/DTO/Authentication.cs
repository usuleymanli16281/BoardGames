namespace BoardGames.DTO
{
    public class RegisterModel
    {
        public string Nick { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

       
    }

    public class LoginModel
    {
        public string Nick { get; set; }
        public string Password { get; set; }
    }
}
