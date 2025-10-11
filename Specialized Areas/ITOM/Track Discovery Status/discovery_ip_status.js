// Array of IP addresses to check
var ipAddressLists = ['192.168.1.35', '192.168.1.27', '192.168.1.15'];

// CMDB table where CI records are stored(Could be Linux/Unix,AIX server,etc)
var ciTableName = 'cmdb_ci_computer';

// Array to hold the final output objects
var ipDiscoveryMapping = [];

// Loop through each IP address in the list
for (var i = 0; i < ipAddressLists.length; i++) {
    var ip = ipAddressLists[i];

    // Query the CMDB to find the CI record with the given IP address
    var ciRecord = new GlideRecord(ciTableName);
    ciRecord.addEncodedQuery('ip_address=' + ip);
    ciRecord.query();

    // Proceed only if a CI record is found for this IP
    if (ciRecord.next()) {

        // Query discovery_device_history to find the related discovery status
        var deviceHistoryGr = new GlideRecord('discovery_device_history');
        deviceHistoryGr.addEncodedQuery(
            'cmdb_ci=' + ciRecord.getUniqueValue() +
            '^last_state=Created CI^ORlast_state=Updated CI'
        );
        deviceHistoryGr.query();

        // If discovery history exists, capture its status number
        if (deviceHistoryGr.next()) {
            // Create an object with IP and discovery status number
            var recordObj = {
                ip_address: ip,
                discovery_status_number: deviceHistoryGr.getDisplayValue('status')
            };
            ipDiscoveryMapping.push(recordObj);
        } else {
            // Optional: handle case where no discovery status found
            var noStatusObj = {
                ip_address: ip,
                discovery_status_number: 'No discovery record found'
            };
            ipDiscoveryMapping.push(noStatusObj);
        }
    } else {
        // Optional: handle case where no CI record found
        var noCIObj = {
            ip_address: ip,
            discovery_status_number: 'No CI found for this IP'
        };
        ipDiscoveryMapping.push(noCIObj);
    }
}

// Log the final array of IP–Discovery Status mappings
gs.info('IP to Discovery Status mapping: ' + JSON.stringify(ipDiscoveryMapping));
