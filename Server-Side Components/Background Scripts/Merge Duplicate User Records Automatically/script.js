(function() {

    var userEmailMap = {};     
    var userCreatedMap = {};   
    var duplicatesFound = 0;

    var userGR = new GlideRecord('sys_user');
    userGR.addNotNullQuery('email');
    userGR.addQuery('active', true);
    userGR.orderBy('email'); // Group by email 
    userGR.query();

    while (userGR.next()) {
        var email = userGR.email.toLowerCase();
        var createdOn = new GlideDateTime(userGR.sys_created_on).getNumericValue(); // Convert to timestamp

        if (!userEmailMap[email]) {
            // First user found for this email temporarily mark as master
            userEmailMap[email] = userGR.sys_id.toString();
            userCreatedMap[email] = createdOn;
        } else {
            // Another user with same email found 
            var masterSysId = userEmailMap[email];
            var masterCreatedOn = userCreatedMap[email];

            var masterIsOlder = createdOn > masterCreatedOn ? true : false;

            if (masterIsOlder) {
                // If this user was created later, we keep the existing master
                // earliest created record will be accepted
                mergeDuplicateUser(userGR, masterSysId);
            } else {
                // If this user was created earlier, this becomes the new master
                var oldMasterGR = new GlideRecord('sys_user');
                if (oldMasterGR.get(masterSysId)) {
                    mergeDuplicateUser(oldMasterGR, userGR.sys_id); // merge old master into new master
                }
                // Update maps
                userEmailMap[email] = userGR.sys_id.toString();
                userCreatedMap[email] = createdOn;
            }

            duplicatesFound++;
        }
    }

    gs.info("Total duplicates merged: " + duplicatesFound);


   
    function mergeDuplicateUser(duplicateGR, masterSysId) {
        // Reassign related incidents
        var incGR = new GlideRecord('incident');
        incGR.addQuery('caller_id', duplicateGR.sys_id);
        incGR.query();
        var count = 0;
        while (incGR.next()) {
            incGR.caller_id = masterSysId;
            incGR.update();
            count++;
        }

        // Deactivate  user
        duplicateGR.active = false;
        duplicateGR.u_merged_to = masterSysId; // optional custom field
        duplicateGR.update();

        gs.info("Merged duplicate user '" + duplicateGR.name + "' → master: " + masterSysId + ". Reassigned " + count + " incidents.");
    }

})();
