function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    var fieldToHide = 'subcategory'; // I have taken subcategory as an example
    if (newValue === '') {
        g_form.setDisplay(fieldToHide, false);
        return;
    }
    var ga = new GlideAjax('NumberOfDependentChoices');
    ga.addParam('sysparm_name', 'getCountOfDependentChoices');
    ga.addParam('sysparm_tableName', g_form.getTableName());
    ga.addParam('sysparm_element', fieldToHide);
    ga.addParam('sysparm_choiceName', newValue);
    ga.getXMLAnswer(callBack);

    function callBack(answer) {
        g_form.setDisplay(fieldToHide, parseInt(answer) > 0 ? true : false);
    }

}
