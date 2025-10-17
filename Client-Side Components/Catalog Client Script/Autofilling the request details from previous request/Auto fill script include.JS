var GetRecentRequestValues = Class.create();
GetRecentRequestValues.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  getValues: function() {
    var userID = this.getParameter('sysparm_user');
    var itemID = this.getParameter('sysparm_item');
    var result = { found: false, values: {} };

    var gr = new GlideRecord('sc_req_item');
    gr.addQuery('requested_for', userID);
    gr.addQuery('cat_item', itemID);
    gr.orderByDesc('sys_created_on');
    gr.setLimit(1);
    gr.query();

    if (gr.next()) {
      result.found = true;

     
      var vars = gr.variables;
      result.values = {
        'requested_for': vars.requested_for + '',
        'location': vars.location + '',
        'department': vars.department + ''
      };
    }

    return JSON.stringify(result);
  }
});

