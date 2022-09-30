// Ajax call
var ga = new GlideAjax('script_include'); // Script Include
ga.addParam('sysparm_name', 'function'); // Function
ga.addParam('sysparm_value', newValue);
ga.getXMLAnswer(callBackParse);

// Callback function
function callBackParse(response) {
	//Your code goes here	
}