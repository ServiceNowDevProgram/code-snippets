// onload Catalog Client Script with Catalog Name 
function onLoad() {
    var variableName = 'bypass_approval_reason';
    var targetGroupName = 'ServiceNow Support'; // The group authorized to skip this step
    var ga = new GlideAjax('UserUtils');
    ga.addParam('sysparm_name', 'isMemberOf');
    ga.addParam('sysparm_group_name', targetGroupName);
    ga.getXMLAnswer(checkAndLockVariable);
    function checkAndLockVariable(response) {
        var isMember = response;
        if (isMember == 'true') {
            var message = 'Value set and locked due to your ' + targetGroupName + ' membership.';
            var setValue = 'Bypassed by authorized ' + targetGroupName + ' member.';
            g_form.setValue(variableName, setValue);
            g_form.setReadOnly(variableName, true);
            g_form.showFieldMsg(variableName, message, 'info');
        } else {
            g_form.setReadOnly(variableName, false);
        }
    }
}

//Script Include
var UserUtils = Class.create();
UserUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    isMemberOf: function() {
        var groupName = this.getParameter('sysparm_group_name');
        var isMember = gs.getUser().isMemberOf(groupName);
        return isMember.toString();
    },

    type: 'UserUtils'
});
