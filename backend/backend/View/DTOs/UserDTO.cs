
using backend.Model;

namespace backend.View.DTOs
{
  public class UserDTO
  {
    public string Id { get; set; }
    public string Email { get; set; }

    public string UserName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public string ProfilePicture { get; set; }

    public UserWishListDTO Wishlist { get; set; } = null!;

    public UserDTO(User user)
    {
      Id = user.Id;
      Email = user.Email ?? string.Empty;
      UserName = user.UserName ?? string.Empty;
      FirstName = user.FirstName;
      LastName = user.LastName;
      CreatedAt = user.CreatedAt;
      UpdatedAt = user.UpdatedAt;
      Wishlist = new UserWishListDTO(user.Wishlist);
      ProfilePicture = user.ProfilePicture;
    }
  }
}