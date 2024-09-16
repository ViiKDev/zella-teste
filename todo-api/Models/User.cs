using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace todo_api.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? Token { get; set; }
        public string? Role { get; set; }
        public string? Phone { get; set; }
        public string? BirthDate { get; set; }
        public string? Gender { get; set; }
    }
}
