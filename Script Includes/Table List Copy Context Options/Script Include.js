//See readme for full setup
var ListCopyOptions = Class.create();
ListCopyOptions.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	getDisplayValue: function(){
		var sys_id = this.getParameter('sysparm_sys_id');
		var field = this.getParameter('sysparm_field');
		var table = this.getParameter('sysparm_table');
		var this_gr = new GlideRecord(table);
		this_gr.get(sys_id);
		return this_gr.getDisplayValue(field);
	},
	type: 'ListCopyOptions'
});