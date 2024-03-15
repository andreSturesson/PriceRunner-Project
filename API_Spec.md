# API Specification

## Base URL

https://NOTCHOSENYET.asturesson.se/

## Authentication

For users the API uses Bearer token and refresh token for authentication. This is only needed for /user endpoint.

## Endpoints

## Products

### Fetch Products

Fetches products based on search query, category, page, and limit.

- Method: GET
- Path: /products
- Query Parameters:
  - query (optional): The search query for products.
  - category (optional): The category of products.
  - page (optional): The page number for pagination.
  - limit (optional): The maximum number of products per page.

##### Default limit is 20 products per request, With a maximum of 50.

#### Example Response

`/products?query=phone&category=electronics&page=1&limit=1`

```JSON
{
  id: "B014TMV5YE",
  title: "Elegance Carry On Suitcase",
  imgUrl: "https://fakeImage.com/image.svg",
  productURL: "https://amazon.com/fakeProduct/B014TMV5YE",
  stars: 3,
  price: 199
  category_id: 34,
}
```

## Categories

- Method: GET
- Path: /categories

#### Example Response

```JSON
{
  id: 1,
  category_name: "Computer Monitors"
}
```

## Users

## Register

Registers a new user.

- Method: POST
- Path: user/register
- Payload:
  - firstname: Firstname.
  - lastname: Lastname.
  - profilePicture: An url to a profile image.
  - email: The email of the user.
  - password: The password of the user.

#### Example response

```JSON
{
  status: 201,
  messeage: "User has been created"
}
```

Login a user

- Method: POST
- Path /user/register
- Payload:
- email: The email of the user
- password: The password of the user

#### Example response

```JSON
{
  token: "ASLDKSDFLASDCMF3434",
  refreshToken: "SDLSFKASCMDSCKAS3"
}
```

The token is valid for 3600 seconds and the refresh token is valid for 1 month.

This requires authentication.

Get user.

- Method: GET
- Path: /user

Returns the current logged in user

Get user wishlist

- Method: GET
- Path /user/wishlist

#### Example reponse

```JSON
{
  userId: "DSFDCA#42d"
  email: "user@domain.com"
  wishList:
  {
      id: 1,
      productId: "B014TMV5YE",
      productName: "AMD Ryzen 7 3800x"
  },
  {
      id: 2,
      productId: "B014TFSAX5YE"
      productName: "Intel Core i3 7100"
  }
}
```

## Error Handling

```JSON
{
  status: 500,
  messeage: "Something went wrong"
}

```
