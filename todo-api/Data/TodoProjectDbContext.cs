using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.EntityFrameworkCore;
using todo_api.Models;

namespace todo_api.Data
{
    public class TodoProjectDbContext : DbContext
    {
        public DbSet<TodoItem> TodoItems => Set<TodoItem>();
        public DbSet<User> Users => Set<User>();
        public TodoProjectDbContext(DbContextOptions<TodoProjectDbContext> options)
                : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<TodoItem>()
                .HasData(GetTodoItems());
        }

        private static IEnumerable<TodoItem> GetTodoItems()
        {
            string[] p = { Directory.GetCurrentDirectory(), "wwwroot", "todoItems.csv" };
            var csvFilePath = Path.Combine(p);

            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                PrepareHeaderForMatch = args => args.Header.ToLower(),
            };

            var data = new List<TodoItem>().AsEnumerable();
            using (var reader = new StreamReader(csvFilePath))
            {
                using (var csvReader = new CsvReader(reader, config))
                {
                    data = csvReader.GetRecords<TodoItem>().ToList();
                }
            }

            return data;
        }

    }

}