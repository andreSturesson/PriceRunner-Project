
using backend.Model;

namespace backend.View.DTOs
{
  public class UserWishListDTO
  {
    public ICollection<ProductDTO> Products { get; set; } = new List<ProductDTO>();

    public UserWishListDTO(Wishlist wishlist)
    {
      Products = wishlist.Products.Select(p => new ProductDTO(p)).ToList();
    }
  }
}