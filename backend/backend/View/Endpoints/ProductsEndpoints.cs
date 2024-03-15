
using Microsoft.AspNetCore.Mvc;

namespace backend.View.Endpoints
{

  public static class ProductsEndpoint
  {
    public static void ConfigureProductEndpoint(this WebApplication products)
    {
      products.MapGroup("/products");
      products.MapGet("/products", GetProducts);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public static async Task<IResult> GetProducts()
    {
      return Results.Ok();
    }
  }
}