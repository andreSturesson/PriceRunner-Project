
using System.Security.Claims;
using backend.Model;
using backend.Repository.Interfaces;
using backend.Utilities;
using backend.View.DTOs;
using backend.View.Payloads;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.View.Endpoints
{

  public static class ReviewEndpoints
  {
    public static void ConfigureReviewEndpoint(this WebApplication review)
    {
      review.MapGroup("/products/");
      review.MapGet("{productId}/reviews", GetReviews);
      review.MapPost("{productId}/reviews", AddReview);
      review.MapPut("reviews", UpdateReview);
      review.MapDelete("reviews", DeleteReview);
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public static async Task<IResult> GetReviews(IReviewRepository reviewRepository, int productId)
    {
      try
      {
        var reviews = await reviewRepository.GetReviews(productId);
        if (reviews == null)
        {
          return Results.NotFound(new Error(Status.NotFound, $"No reviews found for product with ID: {productId}"));
        }
        return TypedResults.Ok(ReviewDTO.FromRepository(reviews));
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
    public static async Task<IResult> AddReview(IReviewRepository reviewRepository, int productId, CreateReviewPayload payload, [FromServices] IHttpContextAccessor httpContext)
    {
      var userId = GetAccountIdFromUser(httpContext);

      if (string.IsNullOrEmpty(payload.Title))
      {
        return Results.BadRequest(new Error(Status.BadRequest, "Title is required"));
      }
      if (string.IsNullOrEmpty(payload.Content))
      {
        return Results.BadRequest(new Error(Status.BadRequest, "Content is required"));
      }
      if (payload.Rating < 1 || payload.Rating > 5)
      {
        return Results.BadRequest(new Error(Status.BadRequest, "Rating must be between 1 and 5"));
      }

      try
      {
        var review = await reviewRepository.AddReview(productId, userId, payload.Title, payload.Content, payload.Rating);
        if (review == null)
        {
          return Results.NotFound(new Error(Status.NotFound, "Review not found"));
        }
        return TypedResults.Ok(new ReviewDTO(review));
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
    public static async Task<IResult> UpdateReview(IReviewRepository reviewRepository, int reviewId, UpdateReviewPayload payload, [FromServices] IHttpContextAccessor httpContext)
    {
      var userId = GetAccountIdFromUser(httpContext);

      if (string.IsNullOrEmpty(payload.Title))
      {
        return Results.BadRequest(new Error(Status.BadRequest, "Title is required"));
      }
      if (string.IsNullOrEmpty(payload.Content))
      {
        return Results.BadRequest(new Error(Status.BadRequest, "Content is required"));
      }
      if (payload.Rating < 1 || payload.Rating > 5)
      {
        return Results.BadRequest(new Error(Status.BadRequest, "Rating must be between 1 and 5"));
      }

      try
      {
        var review = await reviewRepository.UpdateReview(reviewId, payload.Title, payload.Content, payload.Rating);
        if (review == null)
        {
          return Results.NotFound(new Error(Status.NotFound, "Review not found"));
        }
        return TypedResults.Ok(new ReviewDTO(review));
      }
      catch (Exception ex)
      {
        return Results.Conflict(new Error(Status.InternalServerError, ex.Message));
      }
    }

    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [Authorize]
    public static async Task<IResult> DeleteReview(IReviewRepository reviewRepository, int reviewId)
    {
      try
      {
        var review = await reviewRepository.DeleteReview(reviewId);
        if (review == null)
        {
          return Results.NotFound(new Error(Status.NotFound, "Review not found"));
        }
        return TypedResults.Ok(new ReviewDTO(review));
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