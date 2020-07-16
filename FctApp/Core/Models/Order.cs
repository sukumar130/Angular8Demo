using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FctApp.Core.Models
{
    [Table("Orders")]
    public class Order
    {
        public int OrderNo { get; set; }
        public string details { get; set; }
    }
}
