using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;

namespace API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public async Task Add(AppUser user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                throw new NullReferenceException();
            _context.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<AppUser> GetUserById(int id)
        {
            return await _context.Users.FindAsync(id);
        }
        public async Task<IEnumerable<AppUser>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task Update(AppUser user)
        {
            var itemToUpdate = await _context.Users.FindAsync(user.Id);
            if (itemToUpdate == null)
                throw new NullReferenceException();
            if (user.UserName != null) itemToUpdate.UserName = user.UserName;
            await _context.SaveChangesAsync();
        }
    }
}
