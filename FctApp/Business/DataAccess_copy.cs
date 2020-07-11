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
    public class DataAccess_copy : IDataAccess
    {
        private readonly IConfiguration _configuration;
        //string connectionString = "server=(LocalDb)\\MSSQLLocalDB; database=FctDb; Trusted_Connection=True";
        //protected string connectionString;

        public DataAccess_copy(IConfiguration configuration)
        {
            _configuration = configuration;
            //connectionString = _configuration.GetConnectionString("FctDbConnection");
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            //List<Product> products = new List<Product>();

            //using (var conn = new SqlConnection(connectionString))
            //{
            //    var sql = "SELECT * FROM tblProducts ORDER BY Price ASC";
            //    conn.Open();
            //    using (var cmd = new SqlCommand(sql, conn))
            //    {
            //        var rdr = await cmd.ExecuteReaderAsync();
            //        while (rdr.Read())
            //        {
            //            products.Add(new Product
            //            {
            //                Id = rdr["Id"] != null ? (int)rdr["Id"] : default(int),
            //                Name = rdr["Name"] != null ? rdr["Name"].ToString() : default(string),
            //                Price = rdr["Price"] != null ? (int)rdr["Price"] : default(int)
            //            });
            //            var name = rdr["name"].ToString();
            //        }

            //    }
            //}
            //return products != null && products.Count() > 0 ? products.ToArray() : null;

            Product[] products;
            using (var context = new FctDbContext())
            {
                products = context.tblProducts
                                   .Select(p => new Product { Id = p.Id, Name = p.Name, Price = p.Price })
                                   .ToArray();
            }

            return products;
        }

        public bool PopulateItem(Purchase item)
        {
            bool result = true;

            //using (var conn = new SqlConnection(connectionString))
            //{
            //    conn.Open();
            //    var cmd = new SqlCommand("PurchaseItem", conn);
            //    cmd.CommandType = CommandType.StoredProcedure;
            //    cmd.Parameters.AddWithValue("@ProductId", item.ProductId);
            //    cmd.Parameters.AddWithValue("@Quantity", item.Quantity);
            //    cmd.Parameters.AddWithValue("@UserId", item.UserId);
            //    cmd.ExecuteNonQuery();
            //}

            using (var context = new FctDbContext())
            {
                var purchase = new tblPurchase { CustomerId = item.UserId, ProductId = item.ProductId, Quantity = item.Quantity };
                context.tblPurchases.Add(purchase);
                context.SaveChanges();
            }

            return result;
        }

        //public bool PopulateItem(Purchase item)
        //{
        //    bool result = true;

        //    using (SqlConnection connection = new SqlConnection(connectionString))
        //    {
        //        String query = "INSERT INTO dbo.Purchases(Userid, ProductId, Quantity) Values(@Userid, @ProductId, @Quantity)";

        //        using (SqlCommand command = new SqlCommand(query, connection))
        //        {
        //            command.Parameters.AddWithValue("@Userid", item.UserId);
        //            command.Parameters.AddWithValue("@ProductId", item.ProductId);
        //            command.Parameters.AddWithValue("@Quantity", item.Quantity);

        //            connection.Open();
        //            int ret = command.ExecuteNonQuery();

        //            result = ret >= 0;

        //        }
        //    }

        //    return result;
        //}

        public async Task<Customer> CredentialCheck(Customer customer)
        {
            Customer result = null;
            //if (customer != null)
            //{
            //    using (SqlConnection connection = new SqlConnection(connectionString))
            //    {
            //        String query = "SELECT TOP 1 * FROM tblCustomers WHERE Name = @Name and Password=@Password";

            //        using (SqlCommand command = new SqlCommand(query, connection))
            //        {
            //            command.Parameters.AddWithValue("@Name", customer.Name);
            //            command.Parameters.AddWithValue("@Password", customer.Password);
            //            connection.Open();

            //            var rdr = await command.ExecuteReaderAsync();
            //            while (rdr.Read())
            //            {
            //                result = new Customer
            //                {
            //                    Id = rdr["Id"] != null ? (int)rdr["Id"] : default(int),
            //                    Name = rdr["Name"] != null ? rdr["Name"].ToString() : default(string),
            //                    Email = rdr["Name"] != null ? rdr["Email"].ToString() : default(string)
            //                };
            //            }
            //        }
            //    }
            //}

            using (var context = new FctDbContext())
            {
                result = context.tblCustomers
                                .Where(p => p.Name == customer.Name && p.Password == customer.Password)
                                .Select(p => new Customer { Id = p.Id, Name = p.Name, Email = p.Email })
                                .FirstOrDefault();

            }
            return result;
        }
    }
}
