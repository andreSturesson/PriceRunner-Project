namespace backend.Model
{

  public class Product
  {
    public int Id { get; set; } // Primary key
    public required string Title { get; set; }
    public required string ImageUrl { get; set; }
    public required string ProductUrl { get; set; }
    public required string Stars { get; set; }
    public int Price { get; set; }
    public int CategoryId { get; set; } // Foreign key
    public Category Category { get; set; } = null!; // Navigation property
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
  }
}