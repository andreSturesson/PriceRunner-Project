
using backend.Model;

namespace backend.View.DTOs
{
  public class UserWishListDTO
  {
    public int Id { get; set; }

    public ICollection<ProductDTO> Products { get; set; } = new List<ProductDTO>();

    public UserWishListDTO(Wishlist wishlist)
    {
      Id = wishlist.Id;
      Products = wishlist.Products.Select(p => new ProductDTO(p)).ToList();
    }
  }
}