using Microsoft.EntityFrameworkCore.Migrations;

namespace FctApp.Migrations
{
    public partial class InitialCreate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblPurchases_tblCustomers_tblCustomerId",
                table: "tblPurchases");

            migrationBuilder.DropIndex(
                name: "IX_tblPurchases_tblCustomerId",
                table: "tblPurchases");

            migrationBuilder.DropColumn(
                name: "tblCustomerId",
                table: "tblPurchases");

            migrationBuilder.DropColumn(
                name: "tblPurchaseId",
                table: "tblCustomers");

            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "tblPurchases",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "tblPurchases");

            migrationBuilder.AddColumn<int>(
                name: "tblCustomerId",
                table: "tblPurchases",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "tblPurchaseId",
                table: "tblCustomers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblPurchases_tblCustomerId",
                table: "tblPurchases",
                column: "tblCustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblPurchases_tblCustomers_tblCustomerId",
                table: "tblPurchases",
                column: "tblCustomerId",
                principalTable: "tblCustomers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
