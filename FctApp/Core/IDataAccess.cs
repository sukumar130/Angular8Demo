using FctApp.ApiResource;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FctApp.Core
{
    public interface IDataAccess
    {
        Task<IEnumerable<Product>> GetProducts();
        bool PopulateItem(Purchase item);
        Task<Customer> CredentialCheck(Customer customer);
    }
}