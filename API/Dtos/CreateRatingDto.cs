namespace API.Dtos;

public class CreateRatingDto
{
    public int AppUserId { get; set; }
    public int PlaceId { get; set; }
    public int Rate { get; set; }
}