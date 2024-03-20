using backend.Model;

namespace backend.View.DTOs
{
    public class CategoryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public CategoryDTO(Category category) 
        {
            Id = category.Id;
            Name = category.Name;
        }

        public static ICollection<CategoryDTO> FromRepository(IEnumerable<Category> categories)
        {
            return categories.Select(c => new CategoryDTO(c)).ToList();
        }
    }


}
