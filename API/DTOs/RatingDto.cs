using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RatingDto
    {
        public int Id { get; set; }
        [Required]
        [Range(0.0 , 5.0)]
        public float RatingValue { get; set;}
    }
}