
Script Usage :

This function takes the parameters such as source table, source record sys_id, target table, fields that needs to be copied to target table.

As a validation check, the fields from source table should be similar to target else abort inserting the record.


Same Code to invoke the function: 
copyFieldsValidated(
    'dmn_demand',
    '8c10306edbc00810f777526adc961976',
    'pm_project',
    ['name', 'short_description']   //will throw error since name field not common in both tables
);


copyFieldsValidated(
    'dmn_demand',
    '8c10306edbc00810f777526adc961976',
    'pm_project',
    ['short_description']   //Insert the record since short_description is common in both tables
);
