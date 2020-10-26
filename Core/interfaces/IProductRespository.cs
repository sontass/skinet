using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.interfaces
{
    public interface IProductRespository
    {
         Task<Product> GetProductByIdAsync(int id);
         Task<IReadOnlyList<Product>> GetProductsAsync();
         Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync();
         Task<IReadOnlyList<ProductType>> GetProductTypesAsync();
    }
}