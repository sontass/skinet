using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productsRepo, IGenericRepository<ProductBrand> productBrandRepo, IGenericRepository<ProductType> productTypeRepo, IMapper mapper)
        {
            _mapper = mapper;
            _productTypeRepo = productTypeRepo;
            _productBrandRepo = productBrandRepo;
            _productsRepo = productsRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            // var products = await _repo.GetProductsAsync();
            // return Ok(products);
            //return Ok ( await _productsRepo.ListAllAsync()  );

            var spec = new ProductsWithTypesAndBrandsSpecification();

            var products = await _productsRepo.ListAsync(spec);

            // return products.Select(product => new ProductToReturnDto
            // {
            //     Id = product.Id,
            //     Name = product.Name
            // }).ToList();

            return Ok(
                _mapper.Map<IReadOnlyList<Product> , IReadOnlyList<ProductToReturnDto>>(products)
            );
            //return Ok( products );
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            //return Ok ( await _productsRepo.GetByIdAsync(id));
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            //var product = await _productsRepo.ListAsync(spec);
            var product = await _productsRepo.GetEntityWithSpec(spec);
            //return Ok( product );
            // return new ProductToReturnDto
            // {
            //     Id = product.Id,
            //     Name = product.Name,
            //     Description = product.Description,
            //     Price = product.Price
            // };
            return _mapper.Map<Product ,ProductToReturnDto>(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            // var brands = await _repo.GetProductBrandsAsync();
            // return Ok(brands);
            return Ok(await _productBrandRepo.ListAllAsync());


        }
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyCollection<ProductType>>> GetProducTypes()
        {
            return Ok(await _productTypeRepo.ListAllAsync());
        }
    }
}