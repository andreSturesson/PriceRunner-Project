
using backend.Model;
using backend.Repository.Interfaces;
using backend.Utilities;
using backend.View.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace backend.View.Endpoints
{

  public static class CategoriesEndpoints
  {
    public static void ConfigureCategoriesEndpoints(this WebApplication categories)
    {
      categories.MapGroup("/categories");
      categories.MapGet("/categories", GetCategories);
      categories.MapGet("/categories/{id}", GetCategoryById);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public static async Task<IResult> GetCategories(ICategoryRepository repository)
    {
            try
            {
                var categories = await repository.GetCategories();

                if(categories == null )
                {
                    return Results.NotFound(new Error(Status.NotFound, "No categories found"));
                }
                return TypedResults.Ok(CategoryDTO.FromRepository(categories));
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
        public static async Task<IResult> GetCategoryById(ICategoryRepository repository, int id)
        {
            if (id <= 0 || id.GetType() != typeof(int))
            {
                return Results.BadRequest(new Error(Status.BadRequest, "Invalid id"));
            }

            try
            {
                var category = await repository.GetCategoryById(id);
                if (category == null)
                {
                    return Results.NotFound(new Error(Status.NotFound, "Category not found"));
                }
                return TypedResults.Ok(new CategoryDTO(category));
            }
            catch (Exception ex)
            {
                return Results.Conflict(new Error(Status.InternalServerError, ex.Message));
            }
        }

        
  }
}