using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedRoles(RoleManager<AppRole> roleManager)
        {
            var roles = new List<AppRole>
            {
                new AppRole {Name = "MEMBER"},
                new AppRole {Name = "ADMIN"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
        }

        public static async Task SeedUser(UserManager<AppUser> userManager)
        {
            var users = new List<AppUser>()
            {
                new()
                {
                    Id = 1,
                    UserName = "user",
                    NormalizedUserName = "user".ToUpper(),
                    Email = "user@user.user",
                    NormalizedEmail = "user@user.user".ToUpper(),
                    EmailConfirmed = false,
                    PasswordHash = null
                },
                new()
                {
                    Id = 2,
                    UserName = "user2",
                    NormalizedUserName = "user2".ToUpper(),
                    Email = "user@user.user2",
                    NormalizedEmail = "user@user.user2".ToUpper(),
                    EmailConfirmed = false,
                    PasswordHash = null
                }
            };
            var password = new PasswordHasher<AppUser>();
            foreach (var user in users)
            {
                var hashed = password.HashPassword(user, "secret");
                user.PasswordHash = hashed;
            }

            foreach (var user in users)
            {
                if (await userManager.FindByIdAsync(user.Id.ToString()) == null)
                {
                    await userManager.CreateAsync(user);
                }
            }
        }

        public static async Task SeedPlaces(DataContext context)
        {
            var places = new List<Place>()
            {
                new()
                {
                    PlaceId = 1,
                    AppUserId = 1,
                    Category = "Restaurant",
                    City = "Krakow",
                    Country = "Poland",
                    Location = "Rynek Glowny",
                    Name = "Pastarnia",
                    Ratings = null
                },
                new()
                {
                    PlaceId = 2,
                    AppUserId = 1,
                    Category = "Park",
                    City = "Jerozolima",
                    Country = "Poland",
                    Location = "Planty",
                    Name = "Planty",
                    Ratings = null
                },
                new()
                {
                    PlaceId = 3,
                    AppUserId = 1,
                    Category = "Park",
                    City = "Adamów",
                    Country = "Poland",
                    Location = "Planty",
                    Name = "user_FAV",
                    Ratings = null
                }
                ,
                new()
                {
                    PlaceId = 4,
                    AppUserId = 1,
                    Category = "Park",
                    City = "Krakow",
                    Country = "Poland",
                    Location = "Planty",
                    Name = "user_FAV",
                    Ratings = null
                }
                ,
                new()
                {
                    PlaceId = 5,
                    AppUserId = 1,
                    Category = "Park",
                    City = "Krakow",
                    Country = "Poland",
                    Location = "Planty",
                    Name = "user_FAV",
                    Ratings = null
                }
                ,
                new()
                {
                    PlaceId = 6,
                    AppUserId = 1,
                    Category = "Park",
                    City = "Krakow",
                    Country = "Poland",
                    Location = "Planty",
                    Name = "user_FAV",
                    Ratings = null
                }
                ,
                new()
                {
                    PlaceId = 7,
                    AppUserId = 1,
                    Category = "Park",
                    City = "Krakow",
                    Country = "Poland",
                    Location = "Planty",
                    Name = "user_FAV",
                    Ratings = null
                }
                ,
                new()
                {
                    PlaceId = 8,
                    AppUserId = 1,
                    Category = "Park",
                    City = "Krakow",
                    Country = "Poland",
                    Location = "Planty",
                    Name = "user_FAV",
                    Ratings = null
                }
                ,
                new()
                {
                    PlaceId = 9,
                    AppUserId = 1,
                    Category = "Park",
                    City = "Krakow",
                    Country = "Poland",
                    Location = "Planty",
                    Name = "user_FAV",
                    Ratings = null
                }
                ,
                new()
                {
                    PlaceId = 10,
                    AppUserId = 1,
                    Category = "Park",
                    City = "Krakow",
                    Country = "Poland",
                    Location = "Planty",
                    Name = "user_FAV",
                    Ratings = null
                }
            };
            foreach (var place in places)
            {
                if (await context.Places.FindAsync(place.PlaceId) == null)
                {
                    await context.Places.AddAsync(place);
                }
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedRatings(DataContext context)
        {
            var ratings = new List<Rating>()
            {
                new()
                {
                    RatingId = 1,
                    AppUserId = 1,
                    PlaceId = 1,
                    Rate = 5
                },
                new()
                {
                    RatingId = 2,
                    AppUserId = 2,
                    PlaceId = 1,
                    Rate = 1
                }
            };
            foreach (var rating in ratings)
            {
                if (await context.Ratings.FindAsync(rating.RatingId) == null)
                {
                    await context.Ratings.AddAsync(rating);
                }
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedFavourites(DataContext context)
        {
            var favs = new List<Favourite>()
            {
                new()
                {
                    FavouriteId = 1,
                    PlaceId = 1,
                    UserId = 1
                },
                new()
                {
                    FavouriteId = 2,
                    PlaceId = 3,
                    UserId = 1
                }
            };
            foreach (var fav in favs)
            {
                if (await context.Favourites.FindAsync(fav.FavouriteId) == null)
                {
                    await context.Favourites.AddAsync(fav);
                }
            }

            await context.SaveChangesAsync();
        }
    }
}