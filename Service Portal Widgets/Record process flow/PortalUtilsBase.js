var PortalUtilsBase = Class.create();
PortalUtilsBase.prototype = {
	initialize: function() {
  },

getProcessFlows: function(data,table,newRecord, grRecord){
		data.processFlow = {show:false, items:[]};
		
		var grProcessStates = new GlideRecord('sys_process_flow');
		grProcessStates.addQuery("table", table);
		grProcessStates.addQuery("active",true);
		grProcessStates.orderByDesc('order');
		grProcessStates.query();
		
		var matchingFound = false;
		
		while(grProcessStates.next()) {
			data.processFlow.show = true;
			
			var item = {};
			
			item.label = grProcessStates.getValue("label");
			
			if(newRecord){
				item.class_name = "disabled";
			}else if(GlideFilter.checkRecord(grRecord,grProcessStates.getValue("condition"))){
				item.class_name = "completed active";
				matchingFound = true;
			}else{
				if(matchingFound)
					item.class_name = "completed active";
				else
					item.class_name = "disabled";
			}
			
			data.processFlow.items.unshift(item);
		}
		
		if(newRecord && data.processFlow.show && data.processFlow.items.length > 0){
			data.processFlow.items[0].class_name = "active";
		}
 	},

  	type: 'PortalUtilsBase'
};