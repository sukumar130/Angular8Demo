using FctApp.Database.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FctApp.Database
{
    public class FctDbContext: DbContext
    {
        public DbSet<tblCustomer> tblCustomers { get; set; }
        public DbSet<tblPurchase> tblPurchases { get; set; }
        public DbSet<tblProduct> tblProducts { get; set; }

        public FctDbContext(DbContextOptions<FctDbContext> options) : base(options)
        {
        }
        public FctDbContext() : base()
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer("server=(Local)\\HomeSQL; database=FctDb; Trusted_Connection=True; Integrated Security=SSPI");
        }
    }
}
