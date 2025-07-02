// Copy attachments from Approval Record to Change record upon Approval / Rejection

/*
  This script should be used in an Advanced - After - Insert/Update Business Rule with conditions 
  state :: changes to :: Approved
  state :: changes to :: Rejected
*/

(function executeRule(current, previous /*null when async*/ ) {
    var approval = current.getValue('sysapproval');
    var chgGr = new GlideRecord('change_request');
    // Check if the approval record is really a change record or not, if yes copy the Attachments
    if (chgGr.get(approval)) {
        var attachment = new GlideSysAttachment();
        var ids = attachment.copy('sysapproval_approver', current.sys_id, 'change_request', approval);
    }

})(current, previous);