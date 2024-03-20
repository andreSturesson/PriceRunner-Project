
namespace backend.Model
{
  public class Review
  {
    public int Id { get; set; }

    public string Title { get; set; } = null!;
    public string Content { get; set; } = null!;
    public int Rating { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public string? UserId { get; set; }
    public User User { get; set; } = null!;

    public int ProductId { get; set; }
    public Product Product { get; set; } = null!;
  }
}