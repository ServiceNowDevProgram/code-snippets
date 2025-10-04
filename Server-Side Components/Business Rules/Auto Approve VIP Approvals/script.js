(function executeRule(current, previous /*null when async*/ ) {
    // Query the requested item to get the requested_for user
    var grReqItem = new GlideRecord('sc_req_item');
    grReqItem.get(current.sysapproval);
    var requestedFor = grReqItem.request.requested_for;

    // Check if the approver is the same as the requested_for user AND a VIP User
    if (requestedFor == current.approver && current.approver.vip == true) {
        current.setValue('state', 'approved');
        current.update(); //Only needed because this is an after BR, remove this if you decide to do a before BR

        grReqItem.comments = "This request was auto-approved due to Requester's VIP status.";
        grReqItem.update();
    }
})(current, previous);
