
using backend.Repository.Interfaces;
using backend.Utilities;
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
    public static async Task<IResult> GetProducts(IProductRepository productRepository)
    {
      try
      {
        var products = await productRepository.GetProducts();
        if (products == null)
        {
          return Results.NotFound(new Error(Status.NotFound, "No products found"));
        }
        //Will return DTO...
        return TypedResults.Ok(products);
      }
      catch (Exception ex)
      {
        return Results.Conflict(new Error(Status.InternalServerError, ex.Message));
      }
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public static async Task<IResult> GetProductById(IProductRepository productRepository, int id)
    {
      if (id <= 0 || id.GetType() != typeof(int))
      {
        return Results.BadRequest(new Error(Status.BadRequest, "Invalid id"));
      }

      try
      {
        var product = await productRepository.GetProductById(id);
        if (product == null)
        {
          return Results.NotFound(new Error(Status.NotFound, "Product not found"));
        }
        //Will return DTO...
        return TypedResults.Ok(product);
      }
      catch (Exception ex)
      {
        return Results.Conflict(new Error(Status.InternalServerError, ex.Message));
      }
    }
  }
}