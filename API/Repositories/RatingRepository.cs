using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using API.Repositories.Interfaces;

namespace API.Repositories
{
    public class RatingRepository: IRatingRepository
    {
        private readonly DataContext _context;
    
        public RatingRepository(DataContext context)
        {
            _context = context;
        }
        
        public async Task<Rating> GetRatingById(int id)
        {
            return await _context.Ratings.FindAsync(id);
        }

        public async Task<IEnumerable<Rating>> GetAll()
        {
            return await _context.Ratings.ToListAsync();
        }

        public async Task Add(Rating rating)
        {
            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var rating = await _context.Ratings.FindAsync(id);
            if (rating == null)
                throw new NullReferenceException();
            _context.Remove(rating);
            await _context.SaveChangesAsync();
        }
    }
}