using FctApp.ApiResource;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using FctApp.Database;
using Microsoft.EntityFrameworkCore;
using FctApp.Database.Models;

namespace FctApp.Business
{
    public class DataAccess : IDataAccess
    {
        private readonly FctDbContext _context;

        public DataAccess(FctDbContext context)
        {
            this._context = context;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            Product[] products;
            products = await _context.tblProducts
                               .Select(p => new Product { Id = p.Id, Name = p.Name, Price = p.Price })
                               .ToArrayAsync();


            return products;
        }

        public bool PopulateItem(Purchase item)
        {
            bool result = true;

            var purchase = new tblPurchase { CustomerId = item.UserId, ProductId = item.ProductId, Quantity = item.Quantity };
            _context.tblPurchases.Add(purchase);
            _context.SaveChanges();

            return result;
        }

        public async Task<Customer> CredentialCheck(Customer customer)
        {
            Customer result = null;

            result = await _context.tblCustomers
                            .Where(p => p.Name == customer.Name && p.Password == customer.Password)
                            .Select(p => new Customer { Id = p.Id, Name = p.Name, Email = p.Email })
                            .FirstOrDefaultAsync();

            return result;
        }
    }
}
