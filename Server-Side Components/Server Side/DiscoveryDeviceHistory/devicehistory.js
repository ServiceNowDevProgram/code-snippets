/********************************************************************************************/
Input
statusRecord - A GlideRecord object for Discovery Status record

Output
devices - An Array object of list of devices that have been discovered and their related attributes
  operational_status – A choice value and contains three options
    Processing – Discovery is still being executed
    Successful – CI is either created or updated or there are no issues reported
    Not Successful – CI is not discovered or having issues in discovery
  device_id – The Sys Id of the device that was discovered
  ip_address – The IP Address or the Source name of the CI
  issue_count – Number of issues derived from the discovery log. This value is generated from the device history(discovery_device_history) record and is mapped to the Issues column
  isse_link – An HTML link that could be used in Journal field like work notes. The link will direct you to the list of all warnings and error logs associated with your source address. Use this for cases where Operational Status is Not Successful
  device_class – The CI Class of the device discovered eg Windows Server, Linux Server
  last_status – The last status column value of the device history eg Created CI, Updated CI, Alive not active not classified, Active couldn’t classify

/********************************************************************************************/

function getDiscoveryResults(statusRecord) {

    var devices = [];
    var discoveryStatusId = statusRecord.getUniqueValue();
    var discoveryStatus = statusRecord.getValue("state");

    //Query all device history into usable format
    var deviceHistory = new GlideRecord("discovery_device_history");
    deviceHistory.addEncodedQuery("status=" + discoveryStatusId);
    deviceHistory.query();
    while (deviceHistory.next()) {
        var devicesDiscovered = {};
        var issueCount = deviceHistory.getValue("issues");
        var lastState = deviceHistory.getValue("last_state");

        if (!!lastState)
            lastState = lastState.toLowerCase();
        else
            lastState = "";

        if (discoveryStatus != "Completed" && discoveryStatus != "Cancelled") {
            devicesDiscovered.operational_status = "Processing";
        } else if (lastState.indexOf("created") > -1 || lastState.indexOf("updated") > -1) {
            devicesDiscovered.operational_status = "Successful";
        } else if (!lastState && issueCount == 0) {
            devicesDiscovered.operational_status = "Successful";
        } else {
            devicesDiscovered.operational_status = "Not Successful";
        }

        devicesDiscovered.cmdb_device = deviceHistory.getValue("cmdb_ci");
        devicesDiscovered.device_class = deviceHistory.getDisplayValue("classified_as");
        devicesDiscovered.issue_count = issueCount;
        devicesDiscovered.issue_link = deviceHistory.getValue("issues_link");
        devicesDiscovered.ip_address = deviceHistory.getValue("source");
        devicesDiscovered.last_status = deviceHistory.getValue("last_state");
        devices.push(devicesDiscovered);
    }

    return devices;

}
