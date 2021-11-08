function identifyAndQueryCI(className, identificationPayload, lookupIdentificationPayload) {

    var grCI;

    // Build the payload to identify this object 

    var payload = {
        items: [{
            'className': className,
            'values': identificationPayload,
            'lookup': lookupIdentificationPayload
        }]
    };

    // Using IRE, identify and get the CI GlideRecord

    var output = JSON.parse(SNC.IdentificationEngineScriptableApi.identifyCI(JSON.stringify(payload)));

    // Using the IRE operation output, determine whether the CI exist

    if (JSUtil.notNil(output)) {
        if (output.items[0].operation !== 'INSERT') {
            grCI = new GlideRecordUtil().getCIGR(output.items[0].sysId);
        }
    }

    return grCI;

}

// Example of identication of a server using one of its MAC addresses and its name
// this uses one of the out fo the box identification rules 

var grServer = identifyAndQueryCI(

    // Class to identify the CI from
    'cmdb_ci_server',
    
    // Attributes to use to identify (at the same level than the CI class we're searching)
    {
        //'name': '*JEMPLOYEE-IBM'
        'name': 'THIS NAME DOES NOT EXIST!'
    },

    // Attributes to use from classes referencing the one we search in
    [
        {
            'className': 'cmdb_ci_network_adapter',
            'values': {
                //'name': 'eth0',
                'mac_address': '00:13:CE:C9:16:5D'
            }
        },
        {
            'className': 'cmdb_ci_network_adapter',
            'values': {
                //'name': 'eth1',
                'mac_address': '00:14:A4:DE:A6:E2'
            }
        }
    ]

);

// If the CI has been identified we get a valid GlideRecord, otherwise we get undefined

if (JSUtil.notNil(grServer)) {

    gs.debug('Successfully identified CI ' + grServer.getDisplayValue() + ' of class ' + grServer.getValue('sys_class_name'));

} else {

    gs.debug('This CI does not exist');
}
