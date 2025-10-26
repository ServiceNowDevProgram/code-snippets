function onChange(control,oldValue,newValue,isLoading,isTemplate) {
  if(isLoading || newValue === '') {
    return;
  }

  var ga = new GlideAjax('countAssignedUtil');
  ga.addParam('sysparm','getCount');
  ga.addParam('sysparm_assignedto', newValue);
  ga.getXML(callback);

  function callback(response){
    var answer = response.responseXML.documentElement.getAttribute("answer");
    if(answer >=5){
      g_form.addErrorMessage("Please select another person to work on this Incident, selected user is already having 5 tickets in his/her Queue");
      g_form.setValue("assigned_to", "");
    }
  }
}
