
using backend.Model;

namespace backend.Repository.Interfaces
{
  public interface IWishlistRepository
  {
    Task<Wishlist> GetWishlist(string userId);
    Task<Wishlist> AddItemToWishlist(string userId, string productId);
    Task<Product> RemoveItemFromWishlist(string userId, string productId);
  }
}
