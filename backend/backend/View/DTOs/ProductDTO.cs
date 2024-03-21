
namespace backend.View.DTOs
{
  using backend.Model;

  public class ProductDTO
  {
    public string Id { get; set; }
    public string Title { get; set; }
    public string ImageUrl { get; set; }
    public string ProductUrl { get; set; }
    public string Stars { get; set; }
    public float Price { get; set; }
    public Category Category { get; set; } = null!;

    public ProductDTO(Product product)
    {
      Id = product.Id;
      Title = product.Title;
      ImageUrl = product.ImageUrl;
      ProductUrl = product.ProductUrl;
      Stars = product.Stars;
      Price = product.Price;
      Category = product.Category;
    }

    public static ICollection<ProductDTO> FromRepository(IEnumerable<Product> products)
    {
      return products.Select(p => new ProductDTO(p)).ToList();
    }
  }
}