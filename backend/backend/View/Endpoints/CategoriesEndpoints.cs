
using Microsoft.AspNetCore.Mvc;

namespace backend.View.Endpoints
{

  public static class CategoriesEndpoints
  {
    public static void ConfigureCategoriesEndpoints(this WebApplication categories)
    {
      categories.MapGroup("/categories");
      categories.MapGet("/categories", GetCategories);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public static Task<IResult> GetCategories()
    {
      return Task.FromResult(Results.Ok());
    }
  }
}