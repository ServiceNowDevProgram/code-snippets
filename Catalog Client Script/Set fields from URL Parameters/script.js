function onLoad() {

	var fields = g_form.getEditableFields();
	console.log(fields);
	for (var x = 0; x < fields.length; x++) {
		//console.log(getParameterValue(fields[x]));
		if(getParameterValue(fields[x]) != ''){
			g_form.setValue(fields[x], getParameterValue(fields[x]));
		}
	}
}

function getParameterValue(name) {  
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");  
	var regexS = "[\\?&]" + name + "=([^&#]*)";  
	var regex = new RegExp(regexS);  
	var results = regex.exec(top.location);  
	if (results == null) {  
		return "";  
	} else {  
		return unescape(results[1]);  
	}  
}
