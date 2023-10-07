var grApproval = new GlideRecord('sysapproval_approver');
grApproval.get('007a44badba52200a6a2b31be0b8f525');

if(grApproval.sysapproval.getRefRecord().isValidRecord()) { 
   return grApproval.sysapproval.getRefRecord();
}

