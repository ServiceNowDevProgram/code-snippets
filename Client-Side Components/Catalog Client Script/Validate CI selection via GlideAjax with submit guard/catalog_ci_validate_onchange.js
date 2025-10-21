function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading) return;

  var VAR_NAME = 'ci'; // replace with your CI variable name

  // Clear old messages and re-enable submit by default
  g_form.clearMessages();
  if (g_form.setSubmitEnabled) g_form.setSubmitEnabled(true);

  var ciSysId = g_form.getValue(VAR_NAME);
  if (!ciSysId) return;

  var ga = new GlideAjax('CIValidationAjax');
  ga.addParam('sysparm_name', 'validateCi');
  ga.addParam('sysparm_ci', ciSysId);

  ga.getXMLAnswer(function(answer) {
    try {
      var res = JSON.parse(answer || '{}');
      if (res.valid) {
        g_form.addInfoMessage('CI is valid and supported: ' + (res.display || ciSysId));
      } else {
        g_form.addErrorMessage(res.message || 'Selected CI is not valid for this request.');
        if (g_form.setSubmitEnabled) g_form.setSubmitEnabled(false);
      }
    } catch (e) {
      g_form.addErrorMessage('Validation failed. Please try again or choose another CI.');
      if (g_form.setSubmitEnabled) g_form.setSubmitEnabled(false);
    }
  });
}
