namespace API.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; } 
        public string Image { get; set; }
        public string Token { get; set; }
        public List<BookDTO> Books { get; set; }
        public List<RatingDto> Ratings { get; set; }

    }
}