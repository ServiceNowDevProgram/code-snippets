/*
Catalog Client script on the record producer/catalog item you want to open from ui action
   Name - ParseURL
   Type - Onload
   Applies on catalog item view - true
*/

function onLoad() {

  
	g_form.setValue('task',parseURL('sysparm_parent_sys_id'));
	g_form.setValue('description',parseURL('sysparm_description));
	
	function parseURL(paramName) {
		
		var url = decodeURIComponent(top.location.href); //Get the URL and decode it
		var workspaceParams = url.split('extra-params/')[1]; //Split off the url on Extra params
		var allParams = workspaceParams.split('/'); //The params are split on slashes '/'
		
		//Search for the parameter requested
		for (var i=0; i< allParams.length; i++) {
			if(allParams[i] == paramName) {
				return allParams[i+1];
			}
		}
	}
}
/*
pass the parameter name which was used in the ui action to parse the value here.
Example - parseURL('sysparm_description) as I am passing description value in the params from ui action.
*/
