## Script contains scalable method to get display value of particular field from a table for any number of records filtered by a encoded query

> Method: \_getFieldDisplayValues(tableName, query, fieldName)

-   @param {String} tableName: Table name
-   @param {String} query: query to filter the records
-   @param {String} fieldName: Field name for which display value is required

-   @returns {String OR boolean}: comma separated field display values of filtered records
    **OR** false if no record/no display value if found on filtered records

### Example Methods

> getUserEmailAddressesBySysIDs(sysIDs)

-   @param {String} sysIDs: Comma separated list of sysIDs (can also be single sysID)
-   @returns {String}: comma separated email addresses of user profiles sys_id passed in as comma separated values.

> getUserNamesBySysIDs(sysIDs)

-   @param {String} sysIDs: Comma separated list of sysIDs (can also be single sysID)
-   @returns {String}: comma separated names of user profiles sys_id passed in as comma separated values.
