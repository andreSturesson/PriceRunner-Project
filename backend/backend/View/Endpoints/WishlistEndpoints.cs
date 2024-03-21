
using System.Security.Claims;
using backend.Model;
using backend.Repository.Interfaces;
using backend.Utilities;
using backend.View.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.View.Endpoints
{

  public static class WishlistEndpoints
  {
    public static void ConfigureWishListEndpoint(this WebApplication wish)
    {
      wish.MapGroup("/user/wishlist");
      wish.MapGet("/user/wishlist", GetWishlist);
      wish.MapPost("/user/wishlist/{productId}", AddItemToWishlist);
      wish.MapDelete("/user/wishlist/{productId}", RemoveItemFromWishlist);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [Authorize]
    public static async Task<IResult> GetWishlist(IWishlistRepository wishlistRepository, [FromServices] IHttpContextAccessor httpContext)
    {
      var userId = GetAccountIdFromUser(httpContext);
      try
      {
        var wishlist = await wishlistRepository.GetWishlist(userId);
        if (wishlist == null)
        {
          return Results.NotFound(new Error(Status.NotFound, "Wishlist not found"));
        }
        return TypedResults.Ok(new UserWishListDTO(wishlist));
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
    [Authorize]
    public static async Task<IResult> AddItemToWishlist(IWishlistRepository wishlistRepository, string productId, [FromServices] IHttpContextAccessor httpContext)
    {
      var userId = GetAccountIdFromUser(httpContext);

      try
      {
        var wishlist = await wishlistRepository.AddItemToWishlist(userId, productId);
        if (wishlist == null)
        {
          return Results.NotFound(new Error(Status.NotFound, "Wishlist not found"));
        }
        return TypedResults.Ok(new UserWishListDTO(wishlist));
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
    [Authorize]
    public static async Task<IResult> RemoveItemFromWishlist(IWishlistRepository wishlistRepository, [FromServices] IHttpContextAccessor httpContext, string productId)
    {
      var userId = GetAccountIdFromUser(httpContext);
      try
      {
        var wishlist = await wishlistRepository.RemoveItemFromWishlist(userId, productId);
        if (wishlist == null)
        {
          return Results.NotFound(new Error(Status.NotFound, "Wishlist not found"));
        }
        return TypedResults.Ok(new ProductDTO(wishlist));
      }
      catch (Exception ex)
      {
        return Results.Conflict(new Error(Status.InternalServerError, ex.Message));
      }
    }

    private static string GetAccountIdFromUser(IHttpContextAccessor httpContext)
    {
      var userId = httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
      Console.WriteLine(userId);
      return userId;
    }
  }
}