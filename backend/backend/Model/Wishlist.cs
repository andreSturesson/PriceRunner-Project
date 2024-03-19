namespace backend.Model
{

  public class Wishlist
  {
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public string? UserId { get; set; }
    public User User { get; set; } = null!;

    public ICollection<Product> Products { get; set; } = new List<Product>();
  }
}