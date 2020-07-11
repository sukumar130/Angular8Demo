using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FctApp.Database.Models
{
    [Table("tblProducts")]
    public class tblProduct
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
    }


 
}
