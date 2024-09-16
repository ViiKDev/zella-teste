﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using todo_api.Data;

#nullable disable

namespace todo_api.Data.Migrations
{
    [DbContext(typeof(TodoProjectDbContext))]
    [Migration("20240915190139_m4-new-user-columns")]
    partial class m4newusercolumns
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.0");

            modelBuilder.Entity("todo_api.Models.TodoItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CompletedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("EstimatedAt")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsComplete")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("TodoItems");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CompletedAt = "2024-12-20",
                            CreatedAt = "2024-12-20",
                            Description = "SomeDesc",
                            EstimatedAt = "2024-12-20",
                            IsComplete = true,
                            Title = "Walk"
                        },
                        new
                        {
                            Id = 2,
                            CompletedAt = "2024-12-20",
                            CreatedAt = "2024-12-20",
                            Description = "Drink",
                            EstimatedAt = "2024-12-20",
                            IsComplete = true,
                            Title = "Water"
                        },
                        new
                        {
                            Id = 3,
                            CompletedAt = "2024-12-20",
                            CreatedAt = "2024-12-20",
                            Description = "FinishIt",
                            EstimatedAt = "2024-12-20",
                            IsComplete = true,
                            Title = "ZellaProject"
                        });
                });

            modelBuilder.Entity("todo_api.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("BirthDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("Gender")
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("Phone")
                        .HasColumnType("TEXT");

                    b.Property<string>("Role")
                        .HasColumnType("TEXT");

                    b.Property<string>("Token")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
