var RepeatingStandardChange = Class.create();

RepeatingStandardChange.prototype = {
    initialize: function() {
    },
	
	/*
		Given the following params are set before execution:
			template [string]: the name of the CHG template
			assignUser [string]: the username of the user to assign the CHG to
			assignGroup [string]: the group name to assign the CHG to
			shortDesc [string]: the short description for the CHG
			desc [string]: the description for the CHG
			
			startDateTime [string]: (YYYY-MM-DD hh:mm:ss format) the start date for the CHG
			endDateTime [string]: (YYYY-MM-DD hh:mm:ss format) the end date for the CHG
			
		Create a new CHG, and return the number
	*/
	createWithTemplate: function(){
		
		//Lookup the provided template
		var templateGr = new GlideRecord('std_change_producer_version');
		templateGr.addQuery('std_change_producer.name', '=', this.template);
		templateGr.orderByDesc('version');
		templateGr.query();
		
		//If the template was found
		if(templateGr.next()){
			//Initialize a new change
			var chgGr = new GlideRecord('change_request');
			chgGr.initialize();
			
			//Standard Type
			chgGr.type = 'standard';
			chgGr.std_change_producer_version = templateGr.sys_ID;
			
			//Apply query from template
			chgGr.applyEncodedQuery(templateGr.std_change_producer.template.template);
			
			//Compile dates into GDT objects
			var start = new GlideDateTime;
            if(this.startDateTime != '' && this.startDateTime != undefined) start.setDisplayValue(this.startDateTime);

            var end = new GlideDateTime;
            if(this.endDateTime != '' && this.endDateTime != undefined) end.setDisplayValue(this.endDateTime);

            //Set dates
			chgGr.work_start = start.getDisplayValue();
			chgGr.work_end = end.getDisplayValue();
			chgGr.start_date = start.getDisplayValue();
			chgGr.end_date = end.getDisplayValue();
			
			//Set assigned user
			var userGr = new GlideRecord('sys_user');
			userGr.addQuery('user_name', this.assignUser);
			userGr.query();
			if(userGr.next()) chgGr.assigned_to = userGr.sys_id.toString();
			else return "User provided for assignment was not found.";
			
			//Set assignment group
			var groupGr = new GlideRecord('sys_user_group');
			groupGr.addQuery('name', this.assignGroup);
			groupGr.query();
			if(groupGr.next()) chgGr.assignment_group = groupGr.sys_id.toString();
			else return "Group provided for assignment was not found.";
			
			//Set description
			chgGr.short_description = this.shortDesc;
			//Replace newlines with html breaks
			chgGr.description = this.desc.replace(/\n/g, "<br />");
			
			//Create the change
			var newChange = chgGr.insert();
			
			//Manually move through the steps to complete the change
			var chg = new GlideRecord('change_request');
			chg.get(newChange);
			chg.state = -2;
			chg.update();
			chg.state = -1;
			chg.update();
			chg.state = 0;
			chg.update();
			
			if((this.close && this.close == true) || this.close == undefined){
				gs.log("this.close: '" + this.close + "', this.close == false ?: " + (this.close == false));
				chg.close_code = 'successful';
				chg.state = 3;
				chg.update();
			}
			
			//Return the CHG number
			return chg.number.toString();	
		}
		else{
			return "!!! Template provided was not found.";
		}
		
	},

    type: 'RepeatingStandardChange'
};