(function() {
  var collabs = [];
  var gr = new GlideRecord('x_your_scope_collaborators');
  gr.addQuery('request', $sp.getParameter('request_id'));
  gr.query();
  while (gr.next()) {
    collabs.push({
      sys_id: gr.getUniqueValue(),
      name: gr.collaborator.name.toString(),
      status: gr.status.toString(),
      comments: gr.comments.toString()
    });
  }
  data.collaborators = collabs;
})();
