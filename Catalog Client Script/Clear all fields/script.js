/**SNDOC
    @name clearFields
    @description Clear/reset all fields on a form
    @param  {Array} [dontClearFieldsArray] - Fields to not clear
    @example
    clearFields(['field1', 'field2']);
*/

function clearFields(dontClearFieldsArray){
    var fields = g_form.getEditableFields();
    for (var x = 0; x < fields.length; x++) {
        if(dontClearFieldsArray.indexOf(fields[x]) == -1){
            g_form.clearValue(fields[x]);
        }
    }
}