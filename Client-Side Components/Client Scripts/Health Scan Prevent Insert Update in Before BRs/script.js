function onSubmit() {
    /*
	This client script will prevent insert and update operation in onBefore business rules.
    Table: sys_script
    Type: onSubmit
    Ui Type: Desktop
    */
    var whenCond = g_form.getValue('when'); // when condition of business rule
    var scriptVal = g_form.getValue('script'); // script value of business rule.

    if (whenCond == 'before' && (scriptVal.indexOf('insert()') > -1 || scriptVal.indexOf('update()')) > -1) {
        alert("As per ServiceNow best Practise insert and update should be avoided in onBefore BRs. If you still want tp proceed try deactivating client script : " + g_form.getUniqueValue());
        return false;
    }
}
