using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using API.Models;
using API.Repositories;
using API.Repositories.Interfaces;

namespace API.Repositories
{
    public class PlaceRepository: IPlaceRepository
    {
        private readonly DataContext _context;
    
        public PlaceRepository(DataContext context)
        {
            _context = context;
        }
    
        public async Task<Place> GetPlaceById(int id)
        {
            return await _context.Places.FindAsync(id);
        }

        public async Task<IEnumerable<Place>> GetAll()
        {
            return await _context.Places.ToListAsync();
        }

        public async Task Add(Place place)
        {
            _context.Places.Add(place);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var place = await _context.Places.FindAsync(id);
            if (place == null)
                throw new NullReferenceException();
            _context.Remove(place);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Place place)
        {
            var itemToUpdate = await _context.Places.FindAsync(place.PlaceId);
            if (itemToUpdate == null)
                throw new NullReferenceException();
            // ???
            itemToUpdate.Category = place.Category;
            itemToUpdate.Location = place.Location;
            itemToUpdate.Ratings = place.Ratings;
            itemToUpdate.AppUserId = place.AppUserId;
            await _context.SaveChangesAsync();
        }
    }
}

