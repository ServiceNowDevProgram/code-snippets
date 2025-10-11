# CustomUtils

A Script utils containing utility functions, patterns and coding standards.

> Notes:

-   Utility method names starts with "\_"
-   each method is followed by an example code snippet displaying usage of the method.

---

### \_getGlideRecordObject

> \_getGlideRecordObject(sysID, tableName)

parameters:

-   sysID: sys_id of the record
-   tableName: table name of the record

returns:

-   GlideRecord object of the record OR false if record could not be found

Usage:

-   Instead of having multiple GlideRecord code (when you have access ro record sys_id) in different places in your code, call this method to get the record.
-   This method will return false if record could not be found.
