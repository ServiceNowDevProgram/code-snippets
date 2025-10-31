// Background Script - Run in Scripts > Background

function findEmailMismatches() {
    var mismatches = [];

    var deviceGR = new GlideRecord('cmn_notif_device');
    deviceGR.addNotNullQuery('email_address'); // Only check devices with email populated
    deviceGR.addNotNullQuery("user");          // Ensure device is linked to a user
    deviceGR.addQuery("type", "Email");        // Filter for email-type devices
    deviceGR.addQuery("name", "Primary Email");// Filter for primary email devices
    deviceGR.addActiveQuery();                 // Only active devices
    deviceGR.query();

    while (deviceGR.next()) {
        var userGR = new GlideRecord('sys_user');
        userGR.addQuery('email', deviceGR.email_address);
        userGR.query();

        if (!userGR.next()) {
            // Found a mismatch
            mismatches.push({
                device_sys_id: deviceGR.getUniqueValue(),
                device_name: deviceGR.getDisplayValue(),
                email: deviceGR.email_address.toString(),
                user_sys_id: 'No matching user found'
            });
        }
    }

    return mismatches;
}

// Execute and log results
var results = findEmailMismatches();
gs.info('Found ' + results.length + ' email mismatches:');

for (var i = 0; i < results.length; i++) {
    gs.info('Mismatch: Device=' + results[i].device_name + ', Device Email=' + results[i].email);
}
