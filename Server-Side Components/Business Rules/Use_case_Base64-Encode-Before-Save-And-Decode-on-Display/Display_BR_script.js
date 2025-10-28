// Decode on Display Trigger: Before Display
////Decodes fieldName from Base64. Shows decoded value on the form.

(function executeRule(current) {
    if (current.fieldName) { // field name can be anything
        try {
            var decoded = GlideStringUtil.base64Decode(current.fieldName);
            current.setDisplayValue('fieldName', decoded);
        } catch (ex) {
            current.setDisplayValue('fieldName', '[Invalid Base64]');
        }
    }
})(current);   

//If the field is new or updated, encodes its value to Base64. Saves the encoded string to the database.

// For Example User enters Hello World in fieldName.
//Before saving : System encodes and stores SGVsbG8gV29ybGQ= in the database.
//When the record is viewed : Display rule decodes it back to Hello World for the user.
