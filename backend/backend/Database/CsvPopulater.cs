using System.Collections.Generic;
using System.IO;
using backend.Model;
using CsvHelper;
using CsvHelper.Configuration;
using EFCore.BulkExtensions;

namespace backend.Database
{
  public class CsvPopulater
  {

    private readonly WishlistWizardContext _context;
    private readonly string _productCsvPath;
    private readonly string _categoryCsvPath;

    private readonly List<Product> _products;
    private readonly List<Category> _categories;

    public CsvPopulater(WishlistWizardContext context, string productCsvPath, string categoryCsvPath)
    {
      _context = context;
      _productCsvPath = productCsvPath;
      _categoryCsvPath = categoryCsvPath;
      _products = LoadProductsFromCsv();
      _categories = LoadCategoriesFromCsv();
    }

    private List<Product> LoadProductsFromCsv()
    {
      var records = new List<Product>();
      var config = new CsvConfiguration(System.Globalization.CultureInfo.InvariantCulture)
      {
        HasHeaderRecord = false,
        PrepareHeaderForMatch = args => args.Header,
        HeaderValidated = null,
      };
      using (var reader = new StreamReader(_productCsvPath))
      using (var csv = new CsvReader(reader, config))
      {
        csv.Context.RegisterClassMap<ProductMap>();
        csv.Read();
        while (csv.Read())
        {
          var product = csv.GetRecord<Product>();
          records.Add(product);
        }
      }
      return records;
    }

    private List<Category> LoadCategoriesFromCsv()
    {
      var records = new List<Category>();
      var config = new CsvConfiguration(System.Globalization.CultureInfo.InvariantCulture)
      {
        HasHeaderRecord = false,
        PrepareHeaderForMatch = args => args.Header,
        HeaderValidated = null,
      };
      using (var reader = new StreamReader(_categoryCsvPath))
      using (var csv = new CsvReader(reader, config))
      {
        csv.Context.RegisterClassMap<CategoryMap>();
        csv.Read();
        while (csv.Read())
        {
          var category = csv.GetRecord<Category>();
          records.Add(category);
        }
      }
      return records;
    }

    public void PushDataToDb()
    {
      _context.BulkInsert(_categories);
      _context.SaveChanges();
      _context.BulkInsert(_products);
      _context.SaveChanges();
    }

    public List<Product> Products { get { return _products; } }
    public List<Category> Categories { get { return _categories; } }

    public sealed class ProductMap : ClassMap<Product>
    {
      public ProductMap()
      {
        Map(m => m.Id).Index(0);
        Map(m => m.Title).Index(1);
        Map(m => m.ImageUrl).Index(2);
        Map(m => m.ProductUrl).Index(3);
        Map(m => m.Stars).Index(4);
        Map(m => m.Price).Index(6);
        Map(m => m.CategoryId).Index(8);
        Map(m => m.Category).Ignore();
        Map(m => m.Reviews).Ignore();
      }
    }

    public sealed class CategoryMap : ClassMap<Category>
    {
      public CategoryMap()
      {
        Map(m => m.Id).Name("id");
        Map(m => m.Name).Name("category");
      }
    }
  }
}