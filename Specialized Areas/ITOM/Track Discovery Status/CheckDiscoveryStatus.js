// Configuration //
// Define the list of IP addresses to check
var ipList = [
    '192.168.1.35',
    '192.168.1.27',
    '192.168.1.15'
];

// Main Script //
var results = [];

ipList.forEach(function(ip) {
    var result = {
        ip_address: ip,
        discovery_status_number: ''
    };

    //Find CI (Computer) with matching IP
    var ciGR = new GlideRecord('cmdb_ci_computer');
    ciGR.addQuery('ip_address', ip);
    ciGR.query();

    if (ciGR.next()) {
        var ciSysId = ciGR.getUniqueValue();

        //Check if CI has an entry in discovery_device_history
        var historyGR = new GlideRecord('discovery_device_history');
        historyGR.addQuery('ci', ciSysId);
        historyGR.orderByDesc('sys_created_on');
        historyGR.query();

        if (historyGR.next()) {
          
            //Get discovery status number (e.g., DIS123456)
            var statusGR = new GlideRecord('discovery_status');
            if (statusGR.get(historyGR.discovery_status.toString())) {
                result.discovery_status_number = statusGR.number.toString();
            } else {
                result.discovery_status_number = 'Discovery status record not found';
            }
        } else {
            result.discovery_status_number = 'No discovery record found';
        }
    } else {
        result.discovery_status_number = 'No CI found with this IP';
    }

    results.push(result);
});

// Output results to system log in JSON format

gs.info('IP to Discovery Status Mapping:\n' + JSON.stringify(results, null, 2));




//Output//

[
  {
    "ip_address": "192.168.1.35",
    "discovery_status_number": "DIS123145"
  },
  {
    "ip_address": "192.168.1.27",
    "discovery_status_number": "DIS123189"
  },
  {
    "ip_address": "192.168.1.15",
    "discovery_status_number": "No discovery record found"
  }
]

