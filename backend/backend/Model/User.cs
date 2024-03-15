using Microsoft.AspNetCore.Identity;

namespace backend.Model
{
  public class User : IdentityUser
  {
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public ICollection<Wishlist> Wishlist { get; set; } = new List<Wishlist>();
  }
}