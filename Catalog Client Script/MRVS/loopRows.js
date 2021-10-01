var mrvsObj = [];
var multiRow = variable.mrvsName; //replace with the actual name of the mrvs
if (multiRow.getRowCount()) { //if there are any entries on the MRVS loop through it
	var eachRow = multiRow.getRowCount();
	for (var i = 0; i < eachRow; i++) {
		var row = multiRow.getRow(i);
		var rowVars = {};
		rowVars.var1 = row.var1; //replace with the variables in the mrvs
		rowVars.var2 = row.var2;
		rowVars.var3 = row.var3;
		// ... add rows as appropriate for your mrvs
		mrvsObj.push(rowVars); // creates an array of objects of the above fields from the MRVS
	}
}
