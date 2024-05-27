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
        public IFormFile Image { get; set; }
        public string ImageUrl { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
    }
}
