/***********************************************
CONTEXT: https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0779148

Functions:

* locationExists(location) 
	- Parameters : "location" - string of cmn_location name to search for
	- Logic: query cmn_location for existing name using temp location string as a parameter.
	- Outputs: sys_id of corresponding cmn_location record OR null/falsey value if none found

* createLocation(location)
	- Parameters : "location" - string of cmn_location name to create
	- Logic: initialize cmn_location record using temp location string as a parameter for the name value
	- Outputs: sys_id of new cmn_location record
************************************************/


(function executeRule(current, previous /*null when async*/) {
	//Checks for location using locationExists, if false call createLocation passing the 
	//name of the location as a parameter
	current.location = locationExists(current.u_temp_location) || createLocation(current.u_temp_location);
	
	//Queries location table for record that matches the name passed in
	//If query returns results return true, else return false
	function locationExists(location){
		var gr = new GlideRecord("cmn_location");
		gr.addQuery("name", location);
		gr.query();
		if(gr.next())
		   return gr.sys_id;
		else
			return undefined;
	}
	//Creates record on cmn_location using the passed parameter as the name
	function createLocation(location){
		var gr = new GlideRecord("cmn_location");
		gr.initialize();
		gr.name = location;
		gr.parent = '8201c34fac1d55eb36e59da730b7d035';//Global as parent
		return gr.update();
	}
})(current, previous);