var DataValidationUtils = Class.create();
DataValidationUtils.prototype = {
    initialize: function() {},

    validateIncidentData: function(incidentRecord) {
        var errors = [];

        // Validate short description if the field exists
        if (incidentRecord.isValidField('short_description')) {
            if (gs.nil(incidentRecord.short_description)) {
                errors.push('Short description is required.');
            }
        } else {
            errors.push('Field "short_description" does not exist on the record.');
        }

        // Validate priority if the field exists
        if (incidentRecord.isValidField('priority')) {
            if (gs.nil(incidentRecord.priority) || incidentRecord.priority < 1 || incidentRecord.priority > 5) {
                errors.push('Priority must be between 1 and 5.');
            }
        } else {
            errors.push('Field "priority" does not exist on the record.');
        }

        return errors;
    },

    type: 'DataValidationUtils'
};
