function onLoad() {

	try{ // Classic UI
		var pFields = g_form.nameMap;
		console.log(pFields);
		pFields.forEach(function(field){
			if(getParam(field.prettyName)){
				g_form.setValue(field.prettyName, getParam(field.prettyName));
			}
		});

	}catch(e){ // Service Portal or Mobile
		var fields = g_form.getEditableFields();
		console.log(fields);
		fields.forEach(function(field){
			if(getParam(field)){
				g_form.setValue(field, getParam(field));
			}
		});
	}
}

function getParam(name){
	var url = new URL(top.location);
	return url.searchParams.get(name);
}