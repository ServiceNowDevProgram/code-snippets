var midServer1 = 'SNOWMIDPRD01'; // Rename/input your MID server as per your organization
var midServer2 = 'SNOWMIDPRD02'; // Rename/input your second MID server accordingly
var ipAddressScan = current.variables.ip_address; // IP address to scan
var discovery = new Discovery(); // Create a new Discovery object

// Attempt discovery using the first MID Server
workflow.scratchpad.statusID = discovery.discoveryFromIP(ipAddressScan, midServer1);

// If the first attempt was unsuccessful, try the second MID Server
if (workflow.scratchpad.statusID == null) {
    gs.info('Discovery using ' + midServer1 + ' failed. Trying ' + midServer2);
    workflow.scratchpad.statusID = discovery.discoveryFromIP(ipAddressScan, midServer2);
}

// Log the results
gs.log('DiscoveryStatusId: ' + workflow.scratchpad.statusID);
gs.log('QuickDiscoveryIPAddress: ' + ipAddressScan);
current.variables.discovery_status = workflow.scratchpad.statusID;