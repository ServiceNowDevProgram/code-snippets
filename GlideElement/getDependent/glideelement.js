var table_name /* String */ = "incident";
var field_name /* String */ = "subcategory";

fieldHasDependent(table_name, field_name);

/*
Method fieldHasDependent return the field name if available else retun null
Input arguement :- 
table_name - valid table name as a String 
field_name - valid field from the table as a string

Result:- 
null - When no dependend field.
field_value - when dependend
*/

function fieldHasDependent(table_name, field_name){
	var tableGr = new GlideRecord(table_name);
	
	//Get the GlideElement object for the given field
	var glideElement = tableGr.getElement(field_name);	
	gs.print(glideElement.getDependent());	
}
