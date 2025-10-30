function onLoad() {
  var ga = new GlideAjax('ApprovalChainHelper');
  ga.addParam('sysparm_name', 'getApprovers');
  ga.addParam('sysparm_item_id', g_form.getUniqueValue());
  ga.getXMLAnswer(function(response) {
    var approvers = JSON.parse(response);
    var message = 'This request will be approved by: ' + approvers.join(', ');
    g_form.showFieldMsg('requested_for', message, 'info');
  });
}
