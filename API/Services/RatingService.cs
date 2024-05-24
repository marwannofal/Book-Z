using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class RatingService : IRatingService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public RatingService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
//==============================================================================
        public async Task<int> AddRatingAsync(RatingDto ratingDto)
        {
            if (ratingDto == null)
            {
                throw new ArgumentNullException(nameof(ratingDto));
            }
            var rating = new Rating
            {
                Id = ratingDto.Id,
                RatingValue = ratingDto.RatingValue
            };

            await _context.Ratings.AddAsync(rating);
            await _context.SaveChangesAsync();

            return rating.Id;
        }
//==============================================================================
        public async Task<IEnumerable<RatingDto>> GetAllRatingAsync()
        {
            var ratings = await _context.Ratings.ToListAsync();
            return _mapper.Map<IEnumerable<RatingDto>>(ratings);
        }
//==============================================================================
        public async Task<RatingDto> GetRatingByIdAsync(int id)
        {
            var rating = await _context.Ratings.FindAsync(id);
            return _mapper.Map<RatingDto>(rating);
        }
    }
}