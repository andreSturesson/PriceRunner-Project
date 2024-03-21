
using backend.Model;

namespace backend.View.DTOs
{
  public class ProductWithPaginationDTO
  {
    public int TotalPages { get; init; }
    public int NumberOfProducts { get; init; }
    public ICollection<ProductDTO> Products { get; init; } = new List<ProductDTO>();

    public ProductWithPaginationDTO(int totalPages, int numberOfProducts, IEnumerable<Product> products)
    {
      TotalPages = totalPages;
      NumberOfProducts = numberOfProducts;
      Products = ProductDTO.FromRepository(products);
    }
  }
}