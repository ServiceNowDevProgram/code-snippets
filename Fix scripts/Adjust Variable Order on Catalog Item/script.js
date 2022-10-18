
//set the following variables before running the script
var sys_id = "e0ecd03947e29110d3c0c789826d4332"; //provide a catalog item or variable set sys id
var step_size = 100; //provide the step size for the new order


if (sys_id) { //avoid updating all records with empty fields for catalog item or variable set
    var variables = new GlideRecord("item_option_new");
	variables.addQuery("cat_item", sys_id).addOrCondition('variable_set', sys_id);
    variables.orderBy("order");
    variables.query();

    if (variables.hasNext()) {
		var i =0;
        while (variables.next()) {
            variables.order.setValue(i*step_size);
            variables.update();
			i++;
        }
		gs.log("The order of " + i + " variables has been changed, ranging now from 0 to " + (i-1)*step_size);
    }
	else{
		gs.log("No Variables were found for the provided catalog item or variable set sys id");
	}

} else {
    gs.log("Please provide a catalog item or variable set sys id in line 1");
}

