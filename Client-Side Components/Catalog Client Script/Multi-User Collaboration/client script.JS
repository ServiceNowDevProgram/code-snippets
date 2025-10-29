function onSubmit() {
  var collaborators = g_form.getValue('collaborators'); // Multi-user reference field
  if (collaborators) {
    var ga = new GlideAjax('CollaboratorHandler');
    ga.addParam('sysparm_name', 'addCollaborators');
    ga.addParam('sysparm_request_id', g_form.getUniqueValue());
    ga.addParam('sysparm_users', collaborators);
    ga.getXMLAnswer(function(response) {
      alert('Collaborators added: ' + response);
    });
  }
  return true;
}
