using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace todo_api.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? CreatedAt { get; set; }
        public string? EstimatedAt { get; set; }
        public string? CompletedAt { get; set; }
        public bool IsComplete { get; set; }

    }
}
