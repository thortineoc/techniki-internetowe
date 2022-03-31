using System.Collections.Generic;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class AppUser : IdentityUser<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
        public List<Place> Places { get; set; }
        public List<Rating> Ratings { get; set; }

    }
}