(function() {

	
	data.requests = [];
	data.requestlist=[];
	//get the current user
	//var myUserObject = gs.getUser().getID();
var ggrp;

var grp = new GlideRecord('sys_user_group');
grp.addActiveQuery();
grp.addQuery('name','Pharmacy Support Desk');
grp.query();
while(grp.next()){
ggrp = grp.sys_id;
	}
	
	var gru = new GlideRecord('sys_user');
	gru.addActiveQuery();
	gru.addQuery('sys_id','=',gs.getUser().getID());
	gru.query();
	  var grunum;
		var storeid;
		var managerid;
	
	while (gru.next()){
	
	
	
	
	
//Tickets ---------------------------------------------------------------------------------------------------------------------------	
	//get all tickets based on retreived users location
	var gr = new GlideRecord('ticket');
	gr.addActiveQuery();
	//gr.addQuery('location', gru.location);
		gr.addQuery('watch_list','CONTAINS', gru.sys_id);
	//gr.addQuery('u_routing_suggestion_group','NOT','ggrp');	
		var qc2 = gr.addQuery('u_routing_suggestion_group','!=',ggrp);
			  qc2.addOrCondition('u_routing_suggestion_group','');  
	gr.orderByDesc('sys_updated_on');
	gr.query();
	
	
	while(gr.next()){
			try {
				var request = {};
				request.number = gr.getDisplayValue('number');
				request.sys_id = gr.getUniqueValue();
				request.tableName = gr.getTableName();
				request.shortdescription = gr.getDisplayValue('short_description');
		    request.url = {id: 'sc_request', table: 'ticket', sys_id: request.sys_id};
				//if (gr.getValue('short_description').length > 60) {request.shortdescription = request.shortdescription + "..."}
		
				request.openedat = gr.getValue('opened_at');
			
		
		request.state = gr.getDisplayValue('state');
		data.requestlist.push(request);
				}
catch(err) {
	
	
	 
}
				
	}
	
	
	}
	
	
	
	
	
//Incidents ---------------------------------------------------------------------------------------------------------------------------		
	
	var gr = new GlideRecord('incident');
	gr.addActiveQuery();
	//gr.setLimit(10);
	
	//gr.addQuery('location', gru.location);
	gr.addQuery('watch_list','CONTAINS', gru.sys_id);
	gr.addQuery('u_associated_work_order', 'false');
	//gr.addQuery('assignment_group','!=',ggrp);	
	var qc2 = gr.addQuery('assignment_group','!=',ggrp);
			  qc2.addOrCondition('assignment_group','');
	gr.orderByDesc('sys_updated_on');
	gr.query();
	
	
	while(gr.next()){
				try{
				var request = {};
				request.number = gr.getDisplayValue('number');
				request.sys_id = gr.getUniqueValue();
				request.tableName = gr.getTableName();
					
					//if (gr.short_description.getValue() == ''){
						//request.shortdescription = "(No description)";
					//}else{
					request.shortdescription = "No Description";
					try{
				request.shortdescription = gr.getValue('short_description').substring(0,60) ;
					}
					catch(err){
						
					}
					//}
					
		    request.url = {id: 'sc_request', table: 'incident', sys_id: request.sys_id};
				//if (gr.getValue('short_description').length > 60) {request.shortdescription = request.shortdescription + "..."}
		    //request.enviro = gs.getProperty("instance_name");
				request.openedat = gr.getValue('opened_at');
			
		
		request.state = gr.getDisplayValue('state');
		data.requestlist.push(request);
				}
catch(errIncident) {
	
	
	 
}	
	}
	
//Ad Hoc ---------------------------------------------------------------------------------------------------------------------------	

	var grx = new GlideRecord('u_ad_hoc_request');
	grx.addActiveQuery();
	//grx.setLimit(10);
	grx.addQuery('u_associated_work_order','0');
	var qc2 = grx.addQuery('assignment_group','!=',ggrp);
			  qc2.addOrCondition('assignment_group','');
	//gr.addQuery('assignment_group','NOT',ggrp);
	//grx.addQuery('location', gru.location);
	grx.addQuery('watch_list','CONTAINS', gru.sys_id);
	grx.orderByDesc('sys_updated_on');
	grx.query();
	
	
	while(grx.next()){
				try{
				var request = {};
				request.number = grx.getDisplayValue('number');
		request.sys_id = grx.getUniqueValue();
					request.tableName = grx.getTableName();
		request.shortdescription = grx.getValue('short_description').substring(0,60);
			//if (grx.getValue('short_description').length > 60) {requestad.shortdescription = requestad.shortdescription + "..."}
			request.openedat = grx.getValue('opened_at');
		request.state = grx.getDisplayValue('state');
		//requestad.enviro = gs.getProperty('glide.servlet.uri');
		data.requestlist.push(request);
					}
catch(errAdHoc) {
	
	
	 
}
	}

//Work Order ---------------------------------------------------------------------------------------------------------------------------	
	
				var grw = new GlideRecord('wm_order');
	grw.addActiveQuery();
	//grw.setLimit(10);
		//grw.addQuery('location', gru.location);
	grw.addQuery('watch_list','CONTAINS', gru.sys_id);
	var qc2 = gr.addQuery('assignment_group','!=',ggrp);
			  qc2.addOrCondition('assignment_group','');
	//gr.addQuery('assignment_group','!=',ggrp);
	grw.orderByDesc('sys_updated_on');
	grw.query();
	
	
	while(grw.next()){
				try {
				var request = {};
				request.number = grw.getDisplayValue('number');
		request.sys_id = grw.getUniqueValue();
					request.tableName = grw.getTableName();
		//requestwo.shortdescription = grw.getValue('short_description').substring(0,60);
		request.shortdescription = grw.getValue('short_description');
					//	if (grw.getValue('short_description').length > 60) {requestwo.shortdescription = requestwo.shortdescription + "..."}
		request.openedat = grw.getValue('opened_at');		
		request.state = grw.getDisplayValue('state');
				//	requestwo.enviro = gs.getProperty("instance_name");
		data.requestlist.push(request);
					}
catch(errWorkOrder) {
	
	
	 
}
		
	}

//sc request item
	var gr = new GlideRecord('sc_req_item');
	gr.addActiveQuery();
	//gr.setLimit(10);
	//gr.addQuery('assignment_group','!=',ggrp);
	//var qc2 = gr.addQuery('assignment_group','!=',ggrp);
			  //qc2.addOrCondition('assignment_group','');
	//gr.addQuery('opened_by.location', gru.location);
	gr.addQuery('watch_list','CONTAINS', gru.sys_id);
	gr.orderByDesc('sys_updated_on');
	gr.query();
	
	
	while(gr.next()){
				try{
				var request = {};
				request.number = gr.getDisplayValue('number');
				request.sys_id = gr.getUniqueValue();
				request.shortdescription = gr.getValue('short_description').substring(0,60) ;
		    request.url = {id: 'sc_request', table: 'incident', sys_id: request.sys_id};
				//if (gr.getValue('short_description').length > 60) {request.shortdescription = request.shortdescription + "..."}
		    //request.enviro = gs.getProperty("instance_name");
				request.openedat = gr.getValue('opened_at');
					request.tableName = gr.getTableName();
			
		
		request.state = gr.getDisplayValue('state');
		data.requestlist.push(request);
				}
catch(errreqtask) {
	
	
	 
}	
	//}	
	
//request tasks ---------------------------------------------------------------------------------------------------------------------------		
//var gr = new GlideRecord('sc_task');
	//gr.addActiveQuery();

	//var qc2 = gr.addQuery('assignment_group','!=',ggrp);
			//  qc2.addOrCondition('assignment_group','');
//	gr.addQuery('opened_by.location', gru.location);
//	gr.orderByDesc('sys_updated_on');
//	gr.query();
	
	
//	while(gr.next()){
			//	try{
			//	var request = {};
		//		request.number = gr.getDisplayValue('number');
		//		request.sys_id = gr.getUniqueValue();
		//		request.shortdescription = gr.getValue('short_description').substring(0,60) ;
	//	    request.url = {id: 'sc_request', table: 'incident', sys_id: request.sys_id};
			
			//	request.openedat = gr.getValue('opened_at');
			
		
		//request.state = gr.getDisplayValue('state');
	//	data.requestlist.push(request);
				}
//catch(errreqtask) {
	
	
	 
//}	
//	}	
	
	
	data.requests = data.requestlist.sort(function(a,b) {return (a.opened_at > b.opened_at) ? 1 : ((b.opened_at > a.opened_at) ? -1 : 0);} ); 
	
//data.requests.sort(function(a, b){return b.sortOrder - a.sortOrder;});	
//data.requests.sort(function(a, b){return b - a;});
//var newlist = data.requests.sort(function(a,b) {return (a.opened_at > b.opened_at) ? 1 : ((b.opened_at > a.opened_at) ? -1 : 0);} ); 
	
	//var newList = data.requests.sort(sortByOrder);

//function sortByOrder() {
         
//}
	
	
	
})();