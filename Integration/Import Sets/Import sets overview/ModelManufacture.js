  var modelName = source.u_model;
    var manufacturerName = source.u_manufacturer;
 
function getOrCreateModel(modelName, manufacturerName) {
        try {
            var manufacturerSysId = getOrCreateManufacturer(manufacturerName);
            if (!manufacturerSysId) {
                gs.error("MODEL SCRIPT: Failed to find or create manufacturer: " + manufacturerName);
                return null;
            }

            // Query cmdb_model to check if any existing model (including child tables) exists
            var modelGr = new GlideRecord('cmdb_model');
            modelGr.addQuery('name', modelName);
            modelGr.addQuery('manufacturer', manufacturerSysId);
            modelGr.query();

            if (modelGr.next()) {
                gs.info("MODEL SCRIPT: Found existing model: " + modelGr.getUniqueValue());
                return modelGr.getUniqueValue();
            } else {
                // Create in child table: cmdb_hardware_product_model
                var newModel = new GlideRecord('cmdb_hardware_product_model');
                newModel.initialize();
                newModel.setValue('name', modelName);
                newModel.setValue('manufacturer', manufacturerSysId);
                var newModelSysId = newModel.insert();

                if (newModelSysId) {
                    gs.info("MODEL SCRIPT: Created new hardware model: " + newModelSysId);
                    return newModelSysId;
                } else {
                    gs.error("MODEL SCRIPT: Failed to insert new model for " + modelName);
                    return null;
                }
            }
        } catch (e) {
            gs.error("MODEL SCRIPT: Error in getOrCreateModel(): " + (e.message || e));
            return null;
        }
    }

    function getOrCreateManufacturer(name) {
        try {
            var companyGr = new GlideRecord('core_company');
            companyGr.addQuery('name', name);
            companyGr.query();

            if (companyGr.next()) {
                gs.info("MODEL SCRIPT: Found manufacturer: " + companyGr.getUniqueValue());
                return companyGr.getUniqueValue();
            } else {
                companyGr.initialize();
                companyGr.setValue('name', name);
                //companyGr.setValue('manufacturer', true); // Ensure it’s marked as manufacturer
                var newMfrSysId = companyGr.insert();

                if (newMfrSysId) {
                    gs.info("MODEL SCRIPT: Created new manufacturer: " + newMfrSysId);
                    return newMfrSysId;
                } else {
                    gs.error("MODEL SCRIPT: Failed to insert new manufacturer: " + name);
                    return null;
                }
            }
        } catch (e) {
            gs.error("MODEL SCRIPT: Error in getOrCreateManufacturer(): " + (e.message || e));
            return null;
        }
    }
