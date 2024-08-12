using AutoMapper;
using API.Entities;
using API.DTOs;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>();
        CreateMap<UserDto, User>().ForMember(dest => dest.Id, opt => opt.Ignore()); 

        CreateMap<BookDTO, Book>()
            .ForMember(dest => dest.Images, opt => opt.Ignore()); 

        CreateMap<Book, BookDTO>()
            .ForMember(dest => dest.ImageUrls, opt => opt.MapFrom(src => src.Images.Select(img => img.Url).ToList()))
            .ForMember(dest => dest.Images, opt => opt.Ignore());

        CreateMap<RatingDto, Rating>(); 
        CreateMap<Rating, RatingDto>(); 
        
    }
}
