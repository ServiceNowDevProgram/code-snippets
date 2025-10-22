 CMDB Table Definition:
        cmdbTableName specifies the CMDB class you want to analyze (e.g., cmdb_ci_computer).
        Modify this to the desired table name.
Mandatory Fields Array:
        mandatoryFields is an array that holds the names of the fields you want to check for mandatory values. Customize this list as per your requirements.
GlideRecord Query:
        A GlideRecord object is created to query the specified CMDB table.
Iteration and Check:
        The script iterates through all records in the CMDB table and checks each mandatory field to see if it is populated.
        If a mandatory field is missing, it adds the field name to the missingFields array.
Logging:
        If any mandatory fields are missing for a record, it logs the record's sys_id and name, along with the missing fields.
        It also counts and logs the total number of records with missing mandatory fields at the end.
