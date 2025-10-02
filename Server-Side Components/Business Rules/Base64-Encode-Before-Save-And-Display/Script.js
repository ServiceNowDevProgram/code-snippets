//This is Before Insert/Update Business Rule to automatically store sensitive data in Base64 form.

(function executeRule(current, previous) {
    if (current.u_field1.changes()) {
        var plainText = current.u_field1 + '';
        current.u_field1 = GlideStringUtil.base64Encode(plainText);
    }
})(current, previous);





//this is Display busiess rule   to make sure users see the decoded text instead of Base64

(function executeRule(current) {
    if (current.u_field1) {
        try {
            var decoded = GlideStringUtil.base64Decode(current.u_field1);
            current.setDisplayValue('u_field1', decoded);
        } catch (ex) {
            current.setDisplayValue('u_field1', '[Invalid Base64]');
        }
    }
})(current);
