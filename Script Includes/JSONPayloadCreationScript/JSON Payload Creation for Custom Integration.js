//Script to create JSON Payload for Custom REST Integration
//

incident: function(inci,comment,work_note) {
		var getInc = new GlideRecord('incident');
		getInc.get(inci);
		var com='',wn='';
		if(comment=='true')
		{
			com = getInc.comments.getJournalEntry(1); 
		}
		if(work_note=='true')
		{
			wn = getInc.work_notes.getJournalEntry(1);
		}

        var inc = {
            "short_description": getInc.getValue('short_description'),
            "sysid": getInc.getValue('sys_id'),
            "state": getInc.getValue('state'),
            "impact": getInc.getValue('impact'),
            "urgency": getInc.getValue('urgency'),
            "service": getInc.getValue('service'),
            "category": getInc.getValue('category'),
            "sub_category": getInc.getValue('sub_category'),
            "comments": com,
            "work_notes": wn,
            "configuration_item": getInc.getValue('cmdb_ci'),
          // We can add more required fields 
        };
        var result = JSON.stringify(inc);
        return result; // We can also return the JSON also just by "return inc;"
    },
