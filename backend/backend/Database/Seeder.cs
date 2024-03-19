
using backend.Model;

namespace backend.Database
{
  public class Seeder
  {
    private List<Product> _products = new List<Product>()
    {
      // Add each product data here
      new Product()
      {
        Id = 1,
        Title = "Sion Softside Expandable Roller Luggage, Black, Checked-Large 29-Inch",
        ImageUrl = "https://m.media-amazon.com/images/I/815dLQKYIYL._AC_UL320_.jpg",
        ProductUrl = "https://www.amazon.com/dp/B014TMV5YE",
        Stars = "4.5",
        Price = 13999,
        CategoryId = 4,
      },
      new Product()
      {
        Id = 2,
        Title = "Luggage Sets Expandable PC+ABS Durable Suitcase Double Wheels TSA Lock Blue",
        ImageUrl = "https://m.media-amazon.com/images/I/81bQlm7vf6L._AC_UL320_.jpg",
        ProductUrl = "https://www.amazon.com/dp/B07GDLCQXV",
        Stars = "4.5",
        Price = 16999,
        CategoryId = 3,
      },
      new Product()
      {
        Id = 3,
        Title = "Platinum Elite Softside Expandable Checked Luggage, 8 Wheel Spinner Suitcase, TSA Lock, Men and Women, True Navy Blue, Checked Medium 25-Inch",
        ImageUrl = "https://m.media-amazon.com/images/I/71EA35zvJBL._AC_UL320_.jpg",
        ProductUrl = "https://www.amazon.com/dp/B07XSCCZYG",
        Stars = "4.6",
        Price = 36549,
        CategoryId = 8,
      },
      new Product()
      {
        Id = 4,
        Title = "Freeform Hardside Expandable with Double Spinner Wheels, Navy, 2-Piece Set (21/28)",
        ImageUrl = "https://m.media-amazon.com/images/I/91k6NYLQyIL._AC_UL320_.jpg",
        ProductUrl = "https://www.amazon.com/dp/B08MVFKGJM",
        Stars = "4.6",
        Price = 29159,
        CategoryId = 7,
      },
      new Product()
      {
        Id = 5,
        Title = "Winfield 2 Hardside Expandable Luggage with Spinner Wheels, Checked-Large 28-Inch, Deep Blue",
        ImageUrl = "https://m.media-amazon.com/images/I/61NJoaZcP9L._AC_UL320_.jpg",
        ProductUrl = "https://www.amazon.com/dp/B01DJLKZBA",
        Stars = "4.5",
        Price = 17499,
        CategoryId = 5,
      },
      new Product()
      {
        Id = 6,
        Title = "Maxlite 5 Softside Expandable Luggage with 4 Spinner Wheels, Lightweight Suitcase, Men and Women, Sapphire Blue, Carry-On 21-Inch",
        ImageUrl = "https://m.media-amazon.com/images/I/61LnBNsSBSL._AC_UL320_.jpg",
        ProductUrl = "https://www.amazon.com/dp/B07XSCD2R4",
        Stars = "4.5",
        Price = 14449,
        CategoryId = 1,
      }
    };

    private List<Category> _categories = new List<Category>()
    {
    new Category()
    {
    Id = 1,
    Name = "Beading & Jewelry Making"
    },
    new Category()
    {
    Id = 2,
    Name = "Fabric Decorating"
    },
    new Category()
    {
    Id = 3,
    Name = "Knitting & Crochet Supplies"
    },
    new Category()
    {
    Id = 4,
    Name = "Printmaking Supplies"
    },
    new Category()
    {
    Id = 5,
    Name = "Scrapbooking & Stamping Supplies"
    },
    new Category()
    {
    Id = 6,
    Name = "Sewing Products"
    },
    new Category()
    {
    Id = 7,
    Name = "Craft & Hobby Fabric"
    },
    new Category()
    {
    Id = 8,
    Name = "Needlework Supplies"
    },
    new Category()
    {
    Id = 9,
    Name = "Arts, Crafts & Sewing Storage"
    },
    new Category()
    {
    Id = 10,
    Name = "Painting, Drawing & Art Supplies"
    }
    };

    public List<Product> Products { get { return _products; } }
    public List<Category> Categories
    {
      get { return _categories; }
    }
  }
}