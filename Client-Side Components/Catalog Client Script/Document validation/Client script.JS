function onSubmit() {
  var ga = new GlideAjax('DocumentValidationHelper');
  ga.addParam('sysparm_name', 'validateAttachments');
  ga.addParam('sysparm_item_id', g_form.getUniqueValue());
  ga.getXMLAnswer(function(response) {
    if (response !== 'valid') {
      alert('Document validation failed: ' + response);
      return false;
    }
  });
  return true;
}
