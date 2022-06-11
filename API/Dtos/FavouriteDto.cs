using API.Models;
using API.Dtos;

namespace api.Dtos
{
    public class FavouriteDto
    {
        public int Id { get; set; }
        public AppUserDto User { get; set; }
        public Place Place { get; set; }
    }
}
