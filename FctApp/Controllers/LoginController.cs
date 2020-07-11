using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using FctApp.ApiResource;
using FctApp.Business;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace FctApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly IDataAccess _dataAccess;

        private List<Customer> _users = new List<Customer> {
            new Customer { Id = 1, Name="admin", Email="admin@gmail.com", Password="admin" }
        };

        public LoginController(IConfiguration config, IDataAccess dataAccess)
        {
            _config = config;
            _dataAccess = dataAccess;
        }

        [AllowAnonymous]
        [HttpPost("auth")]
        public async Task<IActionResult> Login([FromBody]Customer login)
        {
            IActionResult response = NotFound("Username or password is incorrect, try again please!");

            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }
            var user = await AuthenticateUser(login);

            if (user != null) {
                var tokenString = GenerateJSONWebToken(user);
                user.Token = tokenString;
                response = Ok(user);
                //response = Ok(new { token = tokenString });
            }
            return response;
        }

        private string GenerateJSONWebToken(Customer userInfo)
        {
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.Default.GetBytes(_config["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, userInfo.Name)
                }),
                Expires = DateTime.UtcNow.AddMinutes(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var result = tokenHandler.WriteToken(token);
            return result;
        }

        private async Task<Customer> AuthenticateUser(Customer login)
        {
            Customer user = null;
            user = await _dataAccess.CredentialCheck(login);

            if (user == null)  //Check hard coded user as admin to bypass as of now
            {
                user = _users.FirstOrDefault(p => p.Name == login.Name && p.Password == login.Password);
            };
            if (user != null) {
                user.Password = null;
            }
            return user;
        }

    }
}