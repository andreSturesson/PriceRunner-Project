using backend.View.Endpoints;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Repository;
using Xunit;
using backend.Repository.Interfaces;
using backend.Model;
using backend.View.DTOs;
using backend.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
namespace backend.Tests.Endpoints
{
  public class ProductsEndpointTests
  {
    //   [Fact]
    //   public async Task GetProducts_ReturnsOkResult_WhenProductsExist()
    //   {
    //     // Arrange
    //     var productRepositoryMock = new Mock<IProductRepository>();
    //     var products = new List<Product> { new Product { Id = "1", Title = "Product 1", ImageUrl = "http://image.com", ProductUrl = "http://product.com", Stars = "4" }, new Product { Id = "2", Title = "Product 2", ImageUrl = "http://image.com", ProductUrl = "http://product.com", Stars = "3" } };
    //     productRepositoryMock.Setup(repo => repo.GetProducts(null, 0, 1, 10)).ReturnsAsync(products);


    //     // Act
    //     var result = await ProductsEndpoint.GetProducts(productRepositoryMock.Object);

    //     // Assert
    //     var okResult = Assert.IsType<Ok<ICollection<ProductDTO>>>(result);
    //     var productDTOs = okResult.Value;
    //     Assert.Equal(2, productDTOs.Count);
    //   }

    //   [Fact]
    //   public async Task GetProducts_ReturnsNotFoundResult_WhenNoProductsExist()
    //   {
    //     // Arrange
    //     var productRepositoryMock = new Mock<IProductRepository>();
    //     productRepositoryMock.Setup(repo => repo.GetProducts(null, 0, 1, 10)).ReturnsAsync((List<Product>)null);
    //     // Act
    //     var result = await ProductsEndpoint.GetProducts(productRepositoryMock.Object);

    //     // Assert
    //     var notFoundResult = Assert.IsType<NotFound<Error>>(result);  // Use NotFound<Error> for Minimal APIs
    //     var error = notFoundResult.Value;  // Access the error directly
    //     Assert.Equal(StatusCodes.Status404NotFound, notFoundResult.StatusCode);
    //     Assert.Contains("No products found", error.Message); // Use Contains for ICollection<string>    }
    //   }

    //   [Fact]
    //   public async Task GetProducts_ReturnsConflictResult_WhenExceptionOccurs()
    //   {
    //     // Arrange
    //     var productRepositoryMock = new Mock<IProductRepository>();
    //     productRepositoryMock.Setup(repo => repo.GetProducts(null, 0, 1, 10)).ThrowsAsync(new Exception("Some error message"));
    //     // Act
    //     var result = await ProductsEndpoint.GetProducts(productRepositoryMock.Object);

    //     // Assert
    //     var conflictResult = Assert.IsType<Conflict<Error>>(result); ;
    //     var error = Assert.IsType<Error>(conflictResult.Value);
    //     Assert.Equal(StatusCodes.Status409Conflict, conflictResult.StatusCode);
    //     Assert.Contains("Some error message", error.Message);
    //   }

    //   [Fact]
    //   public async Task GetProductById_ReturnsOkResult_WhenProductExists()
    //   {
    //     // Arrange
    //     var productRepositoryMock = new Mock<IProductRepository>();
    //     var product = new Product { Id = "1", Title = "Product 1", ImageUrl = "http://image.com", ProductUrl = "http://product.com", Stars = "3" };
    //     productRepositoryMock.Setup(repo => repo.GetProductById("1")).ReturnsAsync(product);

    //     // Act
    //     var result = await ProductsEndpoint.GetProductById(productRepositoryMock.Object, "1");

    //     // Assert
    //     var okResult = Assert.IsType<Ok<ProductDTO>>(result);
    //     var productDTO = Assert.IsType<ProductDTO>(okResult.Value);
    //     Assert.Equal(product.Id, productDTO.Id);
    //     Assert.Equal(product.Title, productDTO.Title);
    //   }

    //   [Fact]
    //   public async Task GetProductById_ReturnsNotFoundResult_WhenProductDoesNotExist()
    //   {
    //     // Arrange
    //     var productRepositoryMock = new Mock<IProductRepository>();
    //     productRepositoryMock.Setup(repo => repo.GetProductById("1")).ReturnsAsync((Product)null);

    //     // Act
    //     var result = await ProductsEndpoint.GetProductById(productRepositoryMock.Object, "1");

    //     // Assert
    //     var notFoundResult = Assert.IsType<NotFound<Error>>(result);
    //     var error = Assert.IsType<Error>(notFoundResult.Value);
    //     Assert.Equal(StatusCodes.Status404NotFound, notFoundResult.StatusCode);
    //     Assert.Contains("Product not found", error.Message);
    //   }

    //   [Fact]
    //   public async Task GetProductById_ReturnsBadRequestResult_WhenInvalidIdIsProvided()
    //   {
    //     // Arrange
    //     var productRepositoryMock = new Mock<IProductRepository>();

    //     // Act
    //     var result = await ProductsEndpoint.GetProductById(productRepositoryMock.Object, "-1");

    //     // Assert
    //     var badRequestResult = Assert.IsType<BadRequest<Error>>(result);
    //     var error = Assert.IsType<Error>(badRequestResult.Value);
    //     Assert.Equal(StatusCodes.Status400BadRequest, badRequestResult.StatusCode);
    //     Assert.Contains("Invalid id", error.Message);
    //   }

    //   [Fact]
    //   public async Task GetProductById_ReturnsConflictResult_WhenExceptionOccurs()
    //   {
    //     // Arrange
    //     var productRepositoryMock = new Mock<IProductRepository>();
    //     productRepositoryMock.Setup(repo => repo.GetProductById("1")).ThrowsAsync(new Exception("Some error message"));

    //     // Act
    //     var result = await ProductsEndpoint.GetProductById(productRepositoryMock.Object, "1");

    //     // Assert
    //     var conflictResult = Assert.IsType<Conflict<Error>>(result);
    //     var error = Assert.IsType<Error>(conflictResult.Value);
    //     Assert.Equal(StatusCodes.Status409Conflict, conflictResult.StatusCode);
    //     Assert.Contains("Some error message", error.Message);
    //   }
    // }
  }