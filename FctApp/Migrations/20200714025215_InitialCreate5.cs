using Microsoft.EntityFrameworkCore.Migrations;

namespace FctApp.Migrations
{
    public partial class InitialCreate5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "shared");

            migrationBuilder.CreateSequence<int>(
                name: "OrderNumbers",
                schema: "shared",
                startValue: 1000L,
                incrementBy: 5);

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderNo = table.Column<int>(nullable: false, defaultValueSql: "NEXT VALUE FOR shared.OrderNumbers"),
                    details = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.OrderNo);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropSequence(
                name: "OrderNumbers",
                schema: "shared");
        }
    }
}
