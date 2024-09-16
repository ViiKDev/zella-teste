using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace todo_api.Data.Migrations
{
    public partial class m2updatedfields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Complete",
                table: "TodoItems",
                newName: "IsComplete");

            migrationBuilder.AddColumn<string>(
                name: "CompletedAt",
                table: "TodoItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedAt",
                table: "TodoItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EstimatedAt",
                table: "TodoItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CompletedAt", "CreatedAt", "EstimatedAt", "IsComplete" },
                values: new object[] { "2024-12-20", "2024-12-20", "2024-12-20", true });

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CompletedAt", "CreatedAt", "EstimatedAt", "IsComplete" },
                values: new object[] { "2024-12-20", "2024-12-20", "2024-12-20", true });

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CompletedAt", "CreatedAt", "EstimatedAt", "IsComplete" },
                values: new object[] { "2024-12-20", "2024-12-20", "2024-12-20", true });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompletedAt",
                table: "TodoItems");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "TodoItems");

            migrationBuilder.DropColumn(
                name: "EstimatedAt",
                table: "TodoItems");

            migrationBuilder.RenameColumn(
                name: "IsComplete",
                table: "TodoItems",
                newName: "Complete");

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "Complete",
                value: false);

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 2,
                column: "Complete",
                value: false);

            migrationBuilder.UpdateData(
                table: "TodoItems",
                keyColumn: "Id",
                keyValue: 3,
                column: "Complete",
                value: false);
        }
    }
}
