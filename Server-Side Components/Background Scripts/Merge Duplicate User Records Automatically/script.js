(function() {
    var userEmailMap = {};
    var userGR = new GlideRecord('sys_user');
    userGR.addNotNullQuery('email');
    userGR.addQuery('active', true);
    userGR.query();

    var duplicatesFound = 0;

    while (userGR.next()) {
        var email = userGR.email.toLowerCase();

        if (!userEmailMap[email]) {
            // First user with this email
            userEmailMap[email] = userGR.sys_id.toString();
        } else {
            // Duplicate found then  merge with master
            duplicatesFound++;
            var masterSysId = userEmailMap[email];

            // Reassign related incidents
            var incGR = new GlideRecord('incident');
            incGR.addQuery('caller_id', userGR.sys_id);
            incGR.query();
            var incidentsReassigned = 0;
            while (incGR.next()) {
                incGR.caller_id = masterSysId;
                incGR.update();
                incidentsReassigned++;
            }

            // Deactivate duplicate
            userGR.active = false;
            userGR.u_merged_to = masterSysId; // optional custom field
            userGR.update();
           
            gs.info("Merged duplicate user '" + userGR.name + "' into master. Reassigned " + incidentsReassigned + " incidents.");
        }
    }

    gs.info("Total duplicates merged: " + duplicatesFound);

})();
