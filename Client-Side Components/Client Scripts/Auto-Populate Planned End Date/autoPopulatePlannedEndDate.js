//Client script
//Table: Change Request
//UI Type: All
//Type: onChange
//Field: Planned Start Date
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }  
    var daysToAdd;
    if(g_form.getValue('type') =='standard' || g_form.getValue('type') =='normal')
      daysToAdd = 3; 
    else if(g_form.getValue('type') =='emergency')
      daysToAdd = 1;
    var ga = new GlideAjax("addBusinessDays"); //Calling the add business days script include, which is in the Server-Side Components/Script Includes/Add Business Days/addBusinessDays.js
    ga.addParam('sysparm_name', 'addDays');
    ga.addParam('sysparm_days', daysToAdd); 
    ga.addParam('sysparm_date', newValue);
    ga.getXML(processResponse);

    function processResponse(response) {
        var answer = response.responseXML.documentElement.getAttribute("answer").toString();
        g_form.setValue('end_date', answer);
    }
}
