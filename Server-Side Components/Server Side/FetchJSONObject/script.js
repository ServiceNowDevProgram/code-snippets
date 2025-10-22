function fetchJSONObject(gr, desiredFields /* optional */) {
    // Ensure this is a valid GlideRecord
    if (!(gr instanceof GlideRecord) || !gr.isValidRecord()) {
        return {};
    }

    // Determine fields to retrieve; if none specified, get all fields
    if (!Array.isArray(desiredFields) || desiredFields.length === 0) {
        var gRU = new GlideRecordUtil();
        desiredFields = gRU.getFields(gr); // Retrieves all field names for the record
    }

    var fieldValues = {};
    // Use forEach to loop through the desired fields and add their values to the JSON object
    desiredFields.forEach(function(fieldName) {
        if (gr.isValidField(fieldName)) { // Ensure the field exists in the GlideRecord
            var fieldValue = gr.getValue(fieldName);
            fieldValues[fieldName] = fieldValue ? fieldValue : ''; // Use empty string if value is null
        }
    });

    return fieldValues;
}

// Usage example:
//var gr = new GlideRecord('incident');
//gr.get('sys_id'); // Replace with an actual sys_id or use query methods to get a record
//var jsonObject = fetchJSONObject(gr); // Optionally, add an array of specific fields as the second argument
//gs.info(JSON.stringify(jsonObject)); // Logs the JSON object

