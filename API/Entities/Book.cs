using API.Entities.Enum;

namespace API.Entities
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }        
        public Condition Condition { get; set; }
        public string Description { get; set; }
        public Availability Availability { get; set; }
        public string Image { get; set; }
    }
}