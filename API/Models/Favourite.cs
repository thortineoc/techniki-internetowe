namespace API.Models
{
    public class Favourite
    {
        public int FavouriteId { get; set; }
        public AppUser User { get; set; }
        public Place Place { get; set; }
    }
}
