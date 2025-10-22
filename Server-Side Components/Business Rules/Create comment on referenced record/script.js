(function executeRule(current, previous /*null when async*/ ) {
    //Script to create comment on referenced records in case of update
    //In this example, we are creating a comment on an incident when the name of CI was changed

    //Query all incident which have Configuration item set to current one
    var grInc = new GlideRecord('incident');
    grInc.addQuery('cmdb_ci', current.sys_id);
    grInc.query();

    //Go through all incidents on query list
    while (grInc.next()) {

        //Add new comment about changed name of CI
        grInc.work_notes = 'Name was changed from: ' + previous.getValue('name') + ' to: ' + current.getValue('name') + ' on related Configuration Item.';
        grInc.update();

    }
})(current, previous);
