using System.ComponentModel.DataAnnotations;
namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; } 
        [Required]
        [EmailAddress]
        public string Email { get; set;}
        [Phone]
        public string PhoneNumber { get; set;}
    }
}