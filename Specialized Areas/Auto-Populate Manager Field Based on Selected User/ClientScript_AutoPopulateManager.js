// Type: Catalog Client Script
// Applies to: 'user' field
function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading || newValue == '') {
    g_form.setValue('manager', '');
    return;
  }

  var ga = new GlideAjax('GetManager');
  ga.addParam('sysparm_name', 'getManager');
  ga.addParam('sysparm_user_id', newValue);
  ga.getXMLAnswer(function(response) {
    g_form.setValue('manager', response);
  });
}
