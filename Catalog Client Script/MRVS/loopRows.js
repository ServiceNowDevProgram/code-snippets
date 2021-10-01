var mrvsObj = [];
var multiRow = variable.mrvsName;
if (multiRow.getRowCount()) { //if there are any entries on the MRVS loop through it
	var eachRow = multiRow.getRowCount();
	for (var i = 0; i < eachRow; i++) {
		var row = multiRow.getRow(i);
		var rowVars = {};
		rowVars.var1 = row.var1;
		rowVars.var2 = row.var2;
		rowVars.var3 = row.var3;
		mrvsObj.push(rowVars); // creates an array of objects of the above fields from the MRVS
	}
}
