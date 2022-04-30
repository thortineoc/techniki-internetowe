namespace API.Dtos;

public class CreatePlaceDto
{
    public string Location { get; set; }
    public string Category { get; set; }
    public int AppUserId { get; set; }
}