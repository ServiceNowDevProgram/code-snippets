// Get Requested Item (this query can be modified depending on where you are calling from)
var reqitem = new GlideRecord('sc_req_item');
reqitem.addQuery("sys_id", current.request_item);
reqitem.query();

// Now loop through the items and build the table
while(reqitem.next()) {
	// Get Owned Variables for Requested Item and sort by Order
	var ownvar = new GlideRecord('sc_item_option_mtom');
	ownvar.addQuery('request_item.number', reqitem.number);
	ownvar.addQuery('sc_item_option.value','!=','');
	ownvar.orderBy('sc_item_option.order');
	ownvar.query();
	
	template.print('<table>');
	
	while(ownvar.next()) {
		// Add Question, Answer and Order into notification mail
		// Set variable v to variable name
		var field = ownvar.sc_item_option.item_option_new;
		var fieldValue = ownvar.sc_item_option.item_option_new.name;
		// skip if value empty
		if (reqitem.variables[fieldValue].getDisplayValue() == '') continue;
		// skip if value undefined
		if (reqitem.variables[fieldValue] == undefined) continue;
		// Print variable name
		template.print( '<tr>');
		template.print( '<td><strong>' + field.getDisplayValue() + '</td>');
		// Print Display Value for each variable in Requested Item
		template.print( '<td>' + reqitem.variables[fieldValue].getDisplayValue() + '</td>');
		template.print( '</tr>');
	}
	
	template.print('</table>');
}
