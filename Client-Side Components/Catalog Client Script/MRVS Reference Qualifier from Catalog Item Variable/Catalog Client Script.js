function onLoad() {
	var mgr = g_service_catalog.parent.getValue('v_manager'); //if using this script onLoad of the MRVS
	//var mgr = newValue; // if using this script onChange of the Catalog Item variable
	var filterString = 'active=true^manager=' + mgr; //Reference qualifier following the 'javascript:'
	//alternate method for Service Portal only
	// if (window == null){ //Service Portal method
	// 	var setfilter = g_list.get('v_employee');
	// 	setfilter.setQuery(filterString);
	// } else { //native UI method
		var ga = new GlideAjax('refQualUtils'); //Client callable Script Include Name
		ga.addParam('sysparm_name', 'setSysProp'); //Function in Script Include
		ga.addParam('sysparm_sys_prop_name', 'sr.mrvs.ref_qual.emp'); //System Property Name used in MRVS variable Reference qualifier 
		ga.addParam('sysparm_sys_prop_value', filterString);
		ga.getXML(getResponse);
			
		function getResponse(response) { //to avoid Service Portal 'There is a JavaScript error in your browser console'
			var answer = response.responseXML.documentElement.getAttribute("answer"); 
		}
	//}
}
