
var url = new GlideURL();
url.setFromCurrent();
var source = url.getParam('sysparm_nameofstack'); // Always 'reflist' when opening from Reference Lookup Icon
var field = url.getParam('sysparm_target'); //Dot-walked path to the field (Example: cmdb_ci field on change_request form - change_request.cmdb_ci)

if (source === 'reflist' && field === 'change_request.cmdb_ci') {
	// Add form control logic here
	g_form.setMandatory('name', true);
}
