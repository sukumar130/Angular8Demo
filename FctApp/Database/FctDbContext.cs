using FctApp.Core.Models;
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

        public DbSet<Order> Orders { get; set; }  //For sequence test

        public FctDbContext(DbContextOptions<FctDbContext> options) : base(options)
        {
        }
        public FctDbContext()
        {
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder options)
        //{
        //    options.UseSqlServer("server=(Local)\\HomeSQL; database=FctDb; Trusted_Connection=True; Integrated Security=SSPI");
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //modelBuilder.Query<PurchasedProducts>();
            //Used Modelbuilder to map your class with DbContext class
            modelBuilder.Entity<PurchasedProducts>(entity =>
            {
                entity.HasNoKey();
                entity.Property(e => e.Name);
                entity.Property(e => e.Quantity);
            });

            //SELECT NEXT VALUE FOR DBSequence -- does not need to set as it is already created in Database before migration
            //modelBuilder.HasSequence("DbSequence");

            modelBuilder.HasSequence<int>("OrderNumbers", schema: "shared")
            .StartsAt(1000)
            .IncrementsBy(5);

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.OrderNo);
            });

            modelBuilder.Entity<Order>()
            .Property(o => o.OrderNo)
            .HasDefaultValueSql("NEXT VALUE FOR shared.OrderNumbers");
            //------------------------------------------------------------------------

            base.OnModelCreating(modelBuilder);
        }
    }

    public class PurchasedProducts
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
    }
}
