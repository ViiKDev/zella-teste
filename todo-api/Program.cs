using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using todo_api.Data;
using todo_api.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Connect to database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<TodoProjectDbContext>(option => option.UseSqlite(connectionString));

// Add Cors
builder.Services.AddCors(o => o.AddPolicy("Policy", policy =>
{
    policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(
    x =>
    {
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("VeryVeryLongLongSecretKey...")),
            ValidateAudience = false,
            ValidateIssuer = false
        };
    }
);

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("Policy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

//!'todo-items endpoints

app.MapGet("/api/todo-items", async (TodoProjectDbContext db) =>
    await db.TodoItems.ToListAsync()
);
app.MapGet("/api/todo-items/{id}", async (int id, TodoProjectDbContext db) =>
    await db.TodoItems.FindAsync(id)
);
app.MapGet("/api/todo-items-user/{userId}", async (int userId, TodoProjectDbContext db) =>
    await db.TodoItems.Where(x => x.UserId == userId).ToListAsync()
);
app.MapPost("/api/todo-items/{userId}", async (int userId, TodoItem todoItem, TodoProjectDbContext db) =>
{
    todoItem.UserId = userId;
    
    db.TodoItems.Add(todoItem);
    await db.SaveChangesAsync();

    return Results.Created($"/todo-items/{todoItem.Id}", todoItem);
});
app.MapPut("/api/todo-items/{id}", async (int id, TodoItem inputTodoItem, TodoProjectDbContext db) =>
{
    var todoItem = await db.TodoItems.FindAsync(id);

    if (todoItem is null) return Results.NotFound();

    todoItem.Title = inputTodoItem.Title;
    todoItem.Description = inputTodoItem.Description;
    todoItem.CreatedAt = inputTodoItem.CreatedAt;
    todoItem.EstimatedAt = inputTodoItem.EstimatedAt;
    todoItem.CompletedAt = inputTodoItem.CompletedAt;
    todoItem.IsComplete = inputTodoItem.IsComplete;

    await db.SaveChangesAsync();
    return Results.NoContent();

});
app.MapDelete("/api/todo-items/{id}", async (int id, TodoProjectDbContext db) =>
{
    if (await db.TodoItems.FindAsync(id) is TodoItem todoItem)
    {
        db.TodoItems.Remove(todoItem);
        await db.SaveChangesAsync();
        return Results.Ok(todoItem);
    }
    return Results.NotFound();
});

//!user
app.MapGet("/api/users", async (TodoProjectDbContext db) =>
    await db.Users.ToListAsync()
);
app.MapGet("/api/users/{id}", async (int id, TodoProjectDbContext db) =>
    await db.Users.FindAsync(id)
);
app.MapPut("/api/users/{id}", async (int id, User inputUser, TodoProjectDbContext db) =>
{
    var user = await db.Users.FindAsync(id);

    if (user is null) return Results.NotFound();

    user.Phone = inputUser.Phone;
    user.Gender = inputUser.Gender;
    user.BirthDate = inputUser.BirthDate;

    await db.SaveChangesAsync();
    return Results.Ok(user);

});
app.MapDelete("/api/users/{id}", async (int id, TodoProjectDbContext db) =>
{
    if (await db.Users.FindAsync(id) is User user)
    {
        db.Users.Remove(user);
        await db.SaveChangesAsync();
        return Results.Ok(user);
    }
    return Results.NotFound();
});

app.Run();
