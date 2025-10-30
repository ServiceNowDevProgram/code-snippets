var ApprovalChainHelper = Class.create();
ApprovalChainHelper.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  getApprovers: function() {
    var itemId = this.getParameter('sysparm_item_id');
    var userId = gs.getUserID();

    var approvers = [];

    // Example logic: fetch approval rules based on item and user
    var ruleGR = new GlideRecord('sysapproval_approver');
    ruleGR.addQuery('document_id', 80f8920bc3e4b2105219daec050131e3);
    ruleGR.query();

    while (ruleGR.next()) {
      approvers.push(ruleGR.approver.name.toString());
    }

    return JSON.stringify(approvers);
  }
});
