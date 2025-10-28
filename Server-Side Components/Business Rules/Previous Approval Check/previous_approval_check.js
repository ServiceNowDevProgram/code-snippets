(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here

    var appr = []; // initiate an array for use later
    var gra = new GlideRecord("sysapproval_approver"); // check if any approved approval records exist for the current request
    gra.addQuery('sysapproval', current.getValue('sys_id'));
    gra.addQuery('state', 'approved'); 
    gra.query();
    if (!gra.hasNext()) { // if no approved records, exit script
        return;
    } else {
        while (gra.next()) { // if there are approved records, add them to an array
            appr.push(' ' + gra.approver.getDisplayValue());
        }
    }
    appr = appr.toString(); // convert the array to a string for indexing
    var grr = new GlideRecord("sysapproval_approver"); // check for any pending approval requests
    grr.addQuery('sysapproval', gra.getValue('sysapproval'));
    grr.addQuery('state', 'requested');
    grr.query();
    while (grr.next()) { // compare the requested approvals against the list of approved records
        if (appr.indexOf(grr.approver.getDisplayValue()) > -1) {  // if one exists, set it's state to approved and add a comment
            grr.comments = grr.approver.getDisplayValue() + ' already approved this request during a previous approval step.  System will now auto approve on their behalf.';
            grr.setValue('state', 'approved');
            grr.update();
            break;
        }
    }

})(current, previous);
