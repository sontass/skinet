using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRespository _repo;

        public ProductsController(IProductRespository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _repo.GetProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _repo.GetProductByIdAsync(id);
            return Ok(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands() {
            var brands = await _repo.GetProductBrandsAsync();
            return Ok(brands);

        }
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyCollection<ProductType>>> GetProducTypes() {
            return Ok( await _repo.GetProductTypesAsync() );
        }
    }
}