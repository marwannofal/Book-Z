using API.Entities.Enum;

namespace API.DTOs
{
    public class BookDTO
    {
         public int Id { get; set; }
        public string Title { get; set; }
        public Condition Condition { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
        public string ImageUrl { get; set; }
    }
}
