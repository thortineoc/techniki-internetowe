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
    public class FavouriteRepository : IFavouriteRepository
    {
        private readonly DataContext _context;

        public FavouriteRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Favourite> GetFavouriteById(int id)
        {
            return await _context.Favourites.FindAsync(id);
        }

        public async Task<IEnumerable<Favourite>> GetAll()
        {
            return await _context.Favourites.ToListAsync();
        }

        public async Task Add(Favourite favourite)
        {
            _context.Favourites.Add(favourite);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var favourite = await _context.Favourites.FindAsync(id);
            if (favourite == null)
                throw new NullReferenceException();
            _context.Remove(favourite);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Favourite favourite)
        {
            var itemToUpdate = await _context.Favourites.FindAsync(favourite.FavouriteId);
            if (itemToUpdate == null)
                throw new NullReferenceException();

            itemToUpdate.UserId = favourite.UserId;
            itemToUpdate.PlaceId = favourite.PlaceId;
            await _context.SaveChangesAsync();
        }
    }
}
