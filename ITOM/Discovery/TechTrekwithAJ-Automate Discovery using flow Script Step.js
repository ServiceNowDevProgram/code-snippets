//Place inside a Flow Script Step or a Workflow Script
//Ensure current has a field like ip_address and discovery_status (create custom fields if needed)
//You can also pass ip_address through inputs if not part of the current record
//Replace mid_server_1 and mid_server_2 with actual MID Server names or sys_ids
//You can customize status values or extend it to update logs/audit tables

//This script is used in ServiceNow to automate device discovery on a network by triggering Quick Discovery using a MID Server. It is typically used within a workflow or flow, where you want to scan a device using its IP address.
//It adds reliability by using two MID servers, so if one fails, the other is used as a backup.

(function execute(inputs, outputs) {
    //Define two MID servers for redundancy
    var midServer1 = 'mid_server_1'; // Replace with actual MID server name or sys_id
    var midServer2 = 'mid_server_2'; // Replace with actual MID server name or sys_id

    //Get IP address from current context (usually passed in workflow or flow)
    var ipAddress = current.ip_address || inputs.ip_address;

    if (!ipAddress) {
        gs.error('No IP address provided for discovery.');
        current.discovery_status = 'Failed - No IP address';
        current.update();
        return;
    }

    gs.info('Starting Quick Discovery for IP: ' + ipAddress);

    //Function to trigger Quick Discovery
    function triggerQuickDiscovery(ip, mid) {
        var discovery = new Discovery();
        return discovery.quickDiscovery(ip, mid);
    }

    //Attempt discovery with first MID server
    var status1 = triggerQuickDiscovery(ipAddress, midServer1);

    if (status1) {
        gs.info('Discovery triggered successfully using MID Server 1: ' + midServer1);
        current.discovery_status = 'Triggered via MID Server 1';
    } else {
        gs.warn('Discovery failed with MID Server 1. Trying MID Server 2...');

        var status2 = triggerQuickDiscovery(ipAddress, midServer2);

        if (status2) {
            gs.info('Discovery triggered successfully using MID Server 2: ' + midServer2);
            current.discovery_status = 'Triggered via MID Server 2';
        } else {
            gs.error('Discovery failed with both MID servers.');
            current.discovery_status = 'Failed - Both MID Servers';
        }
    }

    //Update context with final discovery status
    current.update();

})(inputs, outputs);



