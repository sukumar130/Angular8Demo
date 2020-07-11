using Microsoft.EntityFrameworkCore.Migrations;

namespace FctApp.Migrations
{
    public partial class InitialCreate3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblProducts_tblPurchases_tblPurchaseId",
                table: "tblProducts");

            migrationBuilder.DropIndex(
                name: "IX_tblProducts_tblPurchaseId",
                table: "tblProducts");

            migrationBuilder.DropColumn(
                name: "tblPurchaseId",
                table: "tblProducts");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "tblPurchaseId",
                table: "tblProducts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblProducts_tblPurchaseId",
                table: "tblProducts",
                column: "tblPurchaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblProducts_tblPurchases_tblPurchaseId",
                table: "tblProducts",
                column: "tblPurchaseId",
                principalTable: "tblPurchases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
