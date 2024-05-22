using AutoMapper;
using API.Entities;
using API.DTOs;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>(); // Map User entity to UserDto
        CreateMap<UpdateUserDto, User>(); // Map UserUpdateDto to User entity

        CreateMap<Book, BookDTO>(); // Map Book entity to BookDto
        CreateMap<BookDTO, Book>(); // Map BookDto to Book entity

        CreateMap<RatingDto, Rating>(); // Map RatingDto to Rating entity
        CreateMap<Rating, RatingDto>(); // Map Rating entity to RatingDto
        
    }
}
