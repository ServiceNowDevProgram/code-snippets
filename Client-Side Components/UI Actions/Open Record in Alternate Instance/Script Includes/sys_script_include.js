var CrossInstanceHelper = Class.create();
CrossInstanceHelper.prototype = {
    initialize: function() {
    },
	
	//Defines a filter so that tables that will never exist in other environments are not checked.
	_goodTable: function(table){
		
		var disallowedTables = [
			'sys_update_set_source',
			'sys_update_set',
			'sys_email',
			'syslog'
		];
		
		//If the table is disallowed, return false
		if(disallowedTables.indexOf(table) != -1) return false;
		
		//If the table extends task, or extends a table that extends task, return false
		return !(new TableUtils('task').getTableExtensions().indexOf(table) != -1 || new TableUtils(table).getAbsoluteBase() == 'task');
	},
	
	exists: function(instance, table, sys_id){
		
		//If the table is disallowed, return
		if(!_goodTable(table)) return false;
		
		//Determine endpoint from instance
		var endpoint;
		instance = instance.toLowerCase();

        /*
            These are example instance names and their corresponding endpoints. You will need to add your own instances and endpoints here.
        */
		switch(instance){
			case 'prod':
				endpoint = 'PROD Exists';
				break;
			case 'test':
				endpoint = 'TEST Exists';
				break;
			case 'dev':
				endpoint = 'DEV Exists';
				break;
		}
		
		//Build the REST Message
		var r = new sn_ws.RESTMessageV2('Cross-Instance Record Checking', endpoint);
		r.setStringParameterNoEscape('table', table);
		r.setStringParameterNoEscape('sysId', sys_id);
		
		//Execute the request
		var response = r.execute();
		
		//Return whether or not the record exists (true if it exists)
		return(response.getStatusCode().toString() == '200');
	},

    type: 'CrossInstanceHelper'
};