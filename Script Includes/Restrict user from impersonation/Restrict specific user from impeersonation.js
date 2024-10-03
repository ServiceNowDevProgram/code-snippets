var ImpersonateEvaluator = Class.create();

ImpersonateEvaluator.prototype = {
    initialize: function() {},

    type: 'ImpersonateEvaluator',

    canImpersonate: function(currentUser, impersonatedUser) {
        var userImpersonated = impersonatedUser.getID();
        var checkDept = new GlideRecord("cmn_department");

        checkDept.addEncodedQuery('dept_head=' + userImpersonated);
        checkDept.query();

        // If a record exists where the impersonated user is a department head, return false
        if (checkDept.next()) {
            return false;
        } else {
            // If no matching records are found, allow impersonation
            return true;
        }
    }
};
