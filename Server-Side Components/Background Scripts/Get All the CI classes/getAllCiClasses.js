// Find all CI Classes
var table = new TableUtils("cmdb_ci");
var ciTableList = j2js(table.getAllExtensions());
for (var i = 0; i < ciTableList.length; i++) 
gs.print(ciTableList[i]);
