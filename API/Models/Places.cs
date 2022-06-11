using System.Collections.Generic;

namespace API.Models
{
    public class Place
    {
        public int PlaceId { get; set; }
        public int AppUserId { get; set; }

        public string Location { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Category { get; set; }
        
        public string Name { get; set; }
        public List<Rating> Ratings { get; set; }
    }
}
