(function executeRule(current, previous /*null when async*/ ) {

if(current.sysapproval.sys_class_name=='<pass table dictionary name here>'){
    var recis = new GlideRecord('sysapproval_approver');
    recis.addQuery('sysapproval', current.sysapproval);
    recis.addQuery('state', 'approved');
    recis.addQuery('approver', current.approver);
    recis.setLimit(1);
    recis.query();
    if (recis.next()) {

        current.state = 'approved';
        current.comments = 'Auto-Approved as this request was already approved by ' + current.approver.getDisplayValue();
    } 
}

})(current, previous);
