cd..
dotnet ef dbcontext scaffold "Server=.\HomeSQL;Database=FCTDB;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -c "FctContext" -o "FctApp/database" -f > FctApp/database/efscaffold-output.txt
pause

--Database First Approach
PM> Scaffold-DbContext "Server=.\HomeSQL;Database=FCTDB;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Database -Context FctAppContext -Force

--Model First Approach
PM>Add-Migration IntialCreate
PM>Update-Database