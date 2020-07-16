using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FctApp.Core.Models
{

    public class tblPurchase
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }

        //public ICollection<tblProduct> tblProducts { get; set; }
        //public tblPurchase()
        //{
        //    tblProducts = new Collection<tblProduct>();
        //}
    }

 

 
}
