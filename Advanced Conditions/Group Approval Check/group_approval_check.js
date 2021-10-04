(function () {
    if (!JSUtil.nil(current.group)) { // is there a group approval record?
        var grg = new GlideRecord("sysapproval_approver");
        grg.addQuery('group', current.group); // if so, check for other approvers in the same group
        grg.addQuery('state', 'approved'); // look for approved records
        grg.query();
        if (grg.hasNext()) { // if any records exist
            return false; // return false, don't send an email
        }
    }
    return true; // otherwise, return true and send an email
})();
