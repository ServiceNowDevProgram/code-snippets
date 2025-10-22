

//Encode Before Saving Trigger: Before Insert/Update

(function executeRule(current, previous) {
    if (current.fieldName.changes()) {
        var plainText = current.fieldName + '';
        current.fieldName = GlideStringUtil.base64Encode(plainText);
    }
})(current, previous);
//If the field is new or updated, encodes its value to Base64. Saves the encoded string to the database.

// For Example User enters Hello World in fieldName.
//Before saving : System encodes and stores SGVsbG8gV29ybGQ= in the database.
//When the record is viewed : Display rule decodes it back to Hello World for the user.


