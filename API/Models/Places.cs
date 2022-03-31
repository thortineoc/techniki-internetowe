using System.Collections.Generic;

namespace api.Models
{
    public class Place
    {
        public int PlaceId { get; set; }
        public int AppUserId { get; set; }

        public string Location { get; set; }
        public string Category { get; set; }
        public List<Rating> Ratings { get; set; }
    }
}
