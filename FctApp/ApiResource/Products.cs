using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FctApp.ApiResource
{
    public class Product
    {
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a valid Id")]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int Price { get; set; }
    }

    public class Customer
    {
        public int   Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Password { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }

    public class Purchase
    {
        public int Id { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a valid Id")]
        public int ProductId { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a valid quantity")]
        public int Quantity { get; set; }
        [Required]
        public int UserId { get; set; }
    }

    public class Item
    {
        [Required]
        public Product product { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a valid quantity")]
        public int quantity { get; set; }
    }

  
}
