# Get Reference Record

If you need a GlideRecord object for a reference item, then getRefRecord() is the method to use. You must call isValidRecord() after getting the reference record as getRefRecord() does not throw errors for empty values. isValidRecord() will be true if your reference record was found.
