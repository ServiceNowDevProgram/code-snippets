//This is Before Insert/Update Business Rule to automatically store sensitive data in Base64 form.

(function executeRule(current, previous) {
    if (current.variblename.changes()) {
        var plainText = current.variblename + '';
        current.variblename = GlideStringUtil.base64Encode(plainText);
    }
})(current, previous);





//this is Display busiess rule   to make sure users see the decoded text instead of Base64

(function executeRule(current) {
    if (current.variblename) {
        try {
            var decoded = GlideStringUtil.base64Decode(current.variblename);
            current.setDisplayValue('variblename', decoded);
        } catch (ex) {
            current.setDisplayValue('variblename', '[Invalid Base64]');
        }
    }
})(current);
