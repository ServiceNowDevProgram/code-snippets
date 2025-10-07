function onLoad() {
	var filterString = 'sys_class_name=cmdb_ci_ip_router^ORsys_class_name=cmdb_ci_ip_switch' //Reference qualifier that was replaced
	//alternate method for Service Portal only
	// if (window == null){ //Service Portal method
	// 	var setfilter = g_list.get('v_configuration_item');
	// 	setfilter.setQuery(filterString);
	// } else { //native UI method
		var ga = new GlideAjax('refQualUtils'); //Client callable Script Include Name
		ga.addParam('sysparm_name', 'setSysProp'); //Function in Script Include
		ga.addParam('sysparm_sys_prop_name', 'sr.ref_qual.ci'); //System Property Name used in Reference qualifier 
		ga.addParam('sysparm_sys_prop_value', filterString);
		ga.getXML(getResponse);
			
		function getResponse(response) { //to avoid Service Portal 'There is a JavaScript error in your browser console'
			var answer = response.responseXML.documentElement.getAttribute("answer"); 
		}
	//}
}
