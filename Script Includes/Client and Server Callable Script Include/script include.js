//Ensure Client is marked as true

var My_Functions = Class.create();
My_Functions.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	log_info: function(x0){
		var results = {};
		var x = this.getParameter('sysparm_x') || x0;
		gs.info(x);
		results.message = 'success';
		return JSON.stringify(results);
	},
	
    type: 'My_Functions'
});