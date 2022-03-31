namespace api.Models
{
    public class Rating
    {
        public int RatingId { get; set; }
        public int AppUserId { get; set; }
        public int PlaceId { get; set; }
        public int Rate { get; set; }
    }
}
