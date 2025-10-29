var CollaboratorHandler = Class.create();
CollaboratorHandler.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  addCollaborators: function() {
    var requestId = this.getParameter('sysparm_request_id');
    var users = this.getParameter('sysparm_users').split(',');

    users.forEach(function(userId) {
      var gr = new GlideRecord('x_your_scope_collaborators');
      gr.initialize();
      gr.request = requestId;
      gr.collaborator = userId;
      gr.status = 'Pending';
      gr.insert();
    });

    return 'Collaborators added successfully';
  }
});
