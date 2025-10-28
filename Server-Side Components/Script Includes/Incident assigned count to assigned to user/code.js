var assignedtochange = Class.create();
assignedtochange.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	assigned: function(){
		var assign = this.getParameter('sysparm_assign');
		var inc = new GlideRecord('incident');
		inc.addQuery('assigned_to', assign);
		inc.query();
		while(inc.next()) {
			var count = inc.getRowCount();
			return count;
		}
	},

    type: 'assignedtochange'
});
