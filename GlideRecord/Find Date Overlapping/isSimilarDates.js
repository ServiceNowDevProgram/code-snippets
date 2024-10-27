// Logic to check if new dates are falling between already created record's dates.

checkIteSimilarDates: function(dep,arr,trvlr) { // passing new (departure Date , arrival date , user's sys_id)
		dep.toString();
		arr.toString();
		trvlr.toString();
		var newstart = new GlideDateTime();
		newstart.setDisplayValue(dep);
		var newend=new GlideDateTime();
		newend.setDisplayValue(arr);
		
		gs.info("Dep Date "+dep+" Arr "+arr+" trvlr "+trvlr);
		var tr= new GlideRecord('x_adsr_travel_expe_travel_request');
		tr.addEncodedQuery('u_traveler='+trvlr);
		tr.query();
		while(tr.next()){
			var itin= new GlideRecord('x_adsr_travel_expe_itenary');
			itin.addEncodedQuery('u_travelrequest.sys_idSTARTSWITH'+tr.sys_id);
			itin.query();
			while(itin.next()){
				//gs.info('@@true Condition!!');
				var st=new GlideDateTime();
				var en= new GlideDateTime();
				st.setDisplayValue(itin.u_departuredatetime.toString());
				en.setDisplayValue(itin.u_arrivaldatetime.toString());
				
				if((st<newstart && newstart<en) || ( st < newend && newend < en ) ||(newstart<en && en<=newstart)||
(newstart < st && st<newend)){        // Logic to check if new dates are falling between already created record's dates.
					gs.addInfoMessage('Similar travel request exists'+tr.getValue('number'));
					return true;
					
				}
			
			}
		
			
	}
