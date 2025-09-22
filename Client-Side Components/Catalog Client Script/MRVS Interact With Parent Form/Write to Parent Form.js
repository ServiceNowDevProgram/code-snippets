//These methods can be used onLoad, onChange, or onSubmit in a script that Applies to the MRVS 

//Retrieve a variable value from the parent form - works in native UI as well as Service Portal, etc.
g_service_catalog.parent.getValue('variable_name');

//With this approach, you can set a variable value on the parent form - use similar code for other g_form methods like clearValue
//Service Portal method requires an additional Catalog Client Script onLoad that Applies to the Catalog Item
if (this) { //Service Portal method
		this.cat_g_form.clearValue('variable_name');
	} else { //native UI method
		parent.g_form.clearValue('variable_name');
	}
