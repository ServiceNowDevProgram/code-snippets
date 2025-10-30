/*
* In order for this to work make sure to have an onChange catalog client script on a variable that is type Requested For. This variable
* already autopopulates the logged in user with its OOB functionality. In the updateUserFields function you can add any other user fields
* that you might need. 
*/

function onChange(control, oldValue, newValue, isLoading) {
  //This variable will store the sys_id of the user that populates in your requested for variable
  var userID = newValue;

  var ga = new GlideAjax(ReferenceQualifierAjaxHelper);
  ga.addParam('sysparm_name', 'getUserInformation');
  ga.addParam('sysparm_user', userID);
  ga.getXMLAnswer(updateUserFields);

  function updateUserFields(response) {
    var returnedData = JSON.parse(response);
    g_form.setValue("email", returnedData.email);
    g_form.setValue("location", returnedData.location);
    g_form.setValue("title", returnedData.title);
    g_form.setValue("phone", returnedData.phone);
  }
}
