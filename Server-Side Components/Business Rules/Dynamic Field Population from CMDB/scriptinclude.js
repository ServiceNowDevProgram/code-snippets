var DynamicFieldPopulator = Class.create();
DynamicFieldPopulator.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    populateFields: function(currentRecord, tableName) {

        // Ensure CI is selected
        if (!currentRecord.cmdb_ci) return;

        // Fetch CI record
        var ciGR = new GlideRecord('cmdb_ci');
        if (!ciGR.get(currentRecord.cmdb_ci)) return;

        // Mapping: CI field -> Target record field
        var mapping = {
            "owned_by": "assigned_to",
            "assignment_group": "assignment_group",
            "location": "location",
            "department": "u_department", // custom field example
            "business_service": "cmdb_ci_service"
        };

        // Loop through mapping and populate fields if empty
        for (var ciField in mapping) {
            var targetField = mapping[ciField];
            if (!currentRecord[targetField] || currentRecord[targetField] == '') {
                currentRecord[targetField] = ciGR.getValue(ciField);
            }
        }

        return currentRecord; // optional, for reusability
    }

});
