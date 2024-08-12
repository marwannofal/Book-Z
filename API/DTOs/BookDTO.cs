using API.Entities.Enum;

namespace API.DTOs
{
    public class BookDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Condition Condition { get; set; }
        public string Description { get; set; }
        public Availability Availability { get; set; }
        public Category Category { get; set; }
        public List<IFormFile> Images { get; set; } = new List<IFormFile>();
        public List<string> ImageUrls { get; set; } = new List<string>();
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
    }
}
