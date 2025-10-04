/* g_list.getCell(rowSysId, <field_name>) - Accepts two parameters
 * recordSysID (to identify the row) - For example: 23d7584c977a611056e8b3e6f053af6b
 * field_name - name of the field whose value is to be fetched
 */

var recSysId = g_list.getChecked(); // 23d7584c977a611056e8b3e6f053af6b - Can be modified to pass Sys ID by other means
var fieldName = 'short_description'; // Modify as per requirement

var cellVal = g_list.getCell(recSysId, fieldName).innerText;

g_GlideUI.addOutputMessage({
    msg: cellVal,
    type: 'success',
    preventDuplicates: true
}); // Using this fancy notification trick because g_form is not supported on list view
