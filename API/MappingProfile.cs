using AutoMapper;
using API.Entities;
using API.DTOs;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>();
        CreateMap<UserDto, User>().ForMember(dest => dest.Id, opt => opt.Ignore()); 

        // Mapping from BookDTO to Book
        CreateMap<BookDTO, Book>()
            .ForMember(dest => dest.Image, opt => opt.Ignore()); // Ignore the Image property

        // Mapping from Book to BookDTO
        CreateMap<Book, BookDTO>()
            .ForMember(dest => dest.Image, opt => opt.Ignore()) // Ignore the Image property
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Image)); // Map Image URL

        CreateMap<RatingDto, Rating>(); // Map RatingDto to Rating entity
        CreateMap<Rating, RatingDto>(); // Map Rating entity to RatingDto
        
    }
}
