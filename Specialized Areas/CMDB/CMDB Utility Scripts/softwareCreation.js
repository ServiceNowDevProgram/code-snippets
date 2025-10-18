var SoftwareUtils = Class.create();
SoftwareUtils.prototype = {
    initialize: function() {},

    softwareUtil: function(deviceId, softwareId) {
        var softwareInstance = new GlideRecord('cmdb_software_instance');
        gs.info("Transformation" + deviceId + " " + softwareId);
        softwareInstance.addQuery('installed_on', deviceId);
        softwareInstance.addQuery('software', softwareId);
        softwareInstance.query();

        if (!softwareInstance.next()) {
            gs.info("Transformation inside the loop");
            var newSoftwareInstance = new GlideRecord('cmdb_software_instance');
            newSoftwareInstance.initialize();
            newSoftwareInstance.setValue('installed_on', deviceId);
            newSoftwareInstance.setValue('software', softwareId);
            newSoftwareInstance.insert();
        }
    },

    type: 'SoftwareUtils'
};


Transform Script Example

Used within a Transform Map Script to ensure the relationship between the imported software record and its device is maintained.

(function runTransformScript(source, map, log, target /*undefined onStart*/ ) {
    var ninjaSoftware = new global.SoftwareUtils();
    ninjaSoftware.softwareUtil(source.u_device_sys_id, target.getUniqueValue());
})(source, map, log, target);
