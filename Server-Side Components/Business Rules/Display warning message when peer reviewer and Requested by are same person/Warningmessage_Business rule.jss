if (current.sysapproval.sys_class_name =='change_request' && current.approver == current.sysapproval.requested_by)
{
current.setAbortAction('true');
gs.addInfoMessage('The Requester and Peer Reviewer cannot be the same person.  The change request has been sent to the Peer Reviewer group specified and someone else from your team will need to perform the peer review.');
}
