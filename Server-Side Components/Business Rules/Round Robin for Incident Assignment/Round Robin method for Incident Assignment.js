(function executeRule(current, previous /*null when async*/) {

	var agg = new GlideAggregate('incident');
    	agg.addQuery('assignment_group', current.assignment_group);
    	agg.addAggregate('count');
    	agg.query();

	var ga = new GlideAggregate('sys_user_grmember');
    	ga.addQuery('group', current.assignment_group);
    	ga.addAggregate('count');
    	ga.query();

	if (agg.next() && ga.next()) {
        	if (Number(agg.getAggregate('count')) <= Number(ga.getAggregate('count')) {

            		var grmem = new GlideRecord('sys_user_grmember');
            		grmem.addQuery('group', current.assignment_group);
            		grmem.query();
	
            		while (grmem.next()) {

                		var inc = new GlideRecord('incident');
                		inc.addQuery('assignment_group', grmem.group);
                		inc.addQuery('assigned_to', grmem.user);
                		inc.query();

                		if (!inc.hasNext()) {
                    			current.assigned_to = grmem.user;
                    			current.update();
                    			return;
                		}
            		}

        	} else {
            		var min_assignement_group_count, rec_sys_id = null;
            		var count = new GlideAggregate('incident');
            		count.addQuery('assignment_group', current.assignment_group);
            		count.groupBy('assigned_to');
		        count.addNotNullQuery('assigned_to');
            		count.addAggregate('count');
            		count.query();

            		if (count.next()) {
                		min_assignement_group_count = Number(count.getAggregate('count'));
                		rec_sys_id = count.getValue('assigned_to');
            		}

            		count.query();

            		while (count.next()) {
                		var countfinal = Number(count.getAggregate('count'));
                		if (countfinal < min_assignement_group_count) {
                    		min_assignement_group_count = countfinal;
                    		rec_sys_id = count.getValue('assigned_to');
                	}
            }

            if (rec_sys_id == null) {
                var gr_inc = new GlideRecord('sys_user_grmember');
                gr_inc.addQuery('group', current.assignment_group);
                gr_inc.query();
                if (gr_inc.next()) {
                    rec_sys_id = gr_inc.user;
                }
            }

            current.assigned_to = rec_sys_id;
            current.update();
        }

    }
	
})(current, previous);
