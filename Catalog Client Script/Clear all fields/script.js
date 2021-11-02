/**SNDOC
    @name clearFields
    @description Clear/reset all fields on a form
    @param  {Array} [dontClearFieldsArray] - Fields to not clear
    @example
    clearFields(['field1', 'field2']);
*/

function clearFields(dontClearFieldsArray){

	try{ // Classic UI
		var pFields = g_form.nameMap;
		pFields.forEach(function(field){
			if(dontClearFieldsArray.indexOf(field.prettyName) == -1){
				g_form.clearValue(field.prettyName);
			}
		});
	}catch(e){ // Service Portal or Mobile
		var fields = g_form.getEditableFields();
		fields.forEach(function(field){
			if(dontClearFieldsArray.indexOf(fields) == -1){
				g_form.clearValue(field);
			}
		});
	}
}