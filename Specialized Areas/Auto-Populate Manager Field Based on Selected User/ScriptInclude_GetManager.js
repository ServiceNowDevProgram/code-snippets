var GetManager = Class.create();
GetManager.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  getManager: function() {
    var userId = this.getParameter('sysparm_user_id');
    var userGR = new GlideRecord('sys_user');
    if (userGR.get(userId)) {
      return userGR.getValue('manager');
    }
    return '';
  }
});
