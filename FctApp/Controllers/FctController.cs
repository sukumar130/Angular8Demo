using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FctApp.ApiResource;
using FctApp.Business;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FctApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class FctController : ControllerBase
    {
        private readonly ILogger<FctController> _logger;
        private readonly IDataAccess _dataAccess;

        public FctController(ILogger<FctController> logger, IDataAccess dataAccess)
        {
            _logger = logger;
            _dataAccess = dataAccess;
        }

        [HttpGet("Products")]
        public async Task<IEnumerable<Product>> Products()
        {
            var result = await _dataAccess.GetProducts();
            return result;
        }

        //[HttpPost("PurchaseProduct")]
        //public IActionResult PurchaseProduct([FromBody] Item[] items)
        //{
        //    IActionResult response = Unauthorized();
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    if (items != null)
        //    {
        //        items.ToList().ForEach(p =>
        //        {
        //            Purchase item = new Purchase {ProductId = p.product.Id, UserId = 1, Quantity=p.quantity };
        //            _dataAccess.PopulateItem(item);
        //        });
        //        response = Ok(true);
        //    }
        //    return response;
        //}

        [HttpPost("PurchaseItems")]
        public IActionResult PurchaseItems([FromBody] Purchase[] items)
        {
            IActionResult response = Unauthorized();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (items != null)
            {
                items.ToList().ForEach(p =>
                {
                    _dataAccess.PopulateItem(p);
                });
                response = Ok(true);
            }
            return response;
        }
    }
}