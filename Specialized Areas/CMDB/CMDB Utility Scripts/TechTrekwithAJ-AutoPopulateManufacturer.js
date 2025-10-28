// Predefined mapping of model names to manufacturer sys_ids or names
var modelManufacturerMap = {
    'ThinkPad T14': 'Lenovo',
    'EliteBook 840': 'HP',
    'Latitude 7420': 'Dell',
    'MacBook Pro 16': 'Apple',
    'Surface Pro 7': 'Microsoft'
};

// Function to get the manufacturer sys_id from the manufacturer name
function getManufacturerSysId(name) {
    var mfgGR = new GlideRecord('core_company');
    mfgGR.addQuery('name', name);
    mfgGR.query();
    if (mfgGR.next()) {
        return mfgGR.getUniqueValue();
    }
    return null;
}

// GlideRecord to loop through Configuration Items where manufacturer is empty
var ciGR = new GlideRecord('cmdb_ci');
ciGR.addNullQuery('manufacturer'); // Manufacturer is empty
ciGR.query();

var updatedCount = 0;

while (ciGR.next()) {
    var model = ciGR.model.name.toString(); // Get model name

    if (model && modelManufacturerMap.hasOwnProperty(model)) {
        var manufacturerName = modelManufacturerMap[model];
        var manufacturerSysId = getManufacturerSysId(manufacturerName);

        if (manufacturerSysId) {
            ciGR.manufacturer = manufacturerSysId;
            ciGR.update();
            updatedCount++;
            gs.info('Updated CI: ' + ciGR.name + ' | Model: ' + model + ' | Manufacturer: ' + manufacturerName);
        } else {
            gs.warn('Manufacturer "' + manufacturerName + '" not found in core_company table.');
        }
    }
}

gs.info('✅ Auto-populate complete. Total CIs updated: ' + updatedCount);
