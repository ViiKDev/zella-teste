using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using todo_api.Data;
using todo_api.Models;

namespace todo_api.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly TodoProjectDbContext _dbContext;
        public UserController(TodoProjectDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null) return BadRequest();
            if (string.IsNullOrEmpty(userObj.PasswordHash)) return BadRequest();

            var hashedPassword = HashPassword(userObj.PasswordHash);

            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == userObj.Email && x.PasswordHash == hashedPassword);

            if (user == null) return NotFound(new { Message = "User not found!" });

            user.Token = CreateJwt(user);

            return Ok(new
            {
                Token = user.Token,
                Message = "Login success!"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null) return BadRequest();
            if (string.IsNullOrEmpty(userObj.Email) || string.IsNullOrEmpty(userObj.PasswordHash)) return BadRequest();

            var hashedPassword = HashPassword(userObj.PasswordHash);

            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == userObj.Email);
            if (user != null) return BadRequest(new { Message = "This email is already being used!" });

            userObj.Role = "User";

            userObj.PasswordHash = hashedPassword;

            await _dbContext.Users.AddAsync(userObj);
            await _dbContext.SaveChangesAsync();

            return Ok(new { Message = "Register success!" });
        }

        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("VeryVeryLongLongSecretKey...");
            if (user == null || string.IsNullOrEmpty(user.Id.ToString()) || string.IsNullOrEmpty(user.Role)) {
        throw new ArgumentException("User or required user properties are null or empty.");
        }
            var identity = new ClaimsIdentity(new Claim[] {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role)
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}
