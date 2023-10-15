# Migrate data from one table to another

Sometimes we have to migrate data from one table to another but there has been a lot of customizations on the existing table including the custom columns.

In order to ensure there is no data loss while migrating data, we must have one backup table **sn_data_fix_backup** where we push data before starting migration and there will be no data loss even in the case of any failure. Below is the xml deinition of the backup table.

```
<?xml version="1.0" encoding="UTF-8"?><database>
    <element label="Data Fix Backup" max_length="40" name="sn_data_fix_backup" sizeclass="0" type="collection" create_access="true" read_access="true" delete_access="true" update_access="true">
        <element label="Record ID" max_length="32" name="record_id" type="GUID"/>
        <element choice="1" label="State" max_length="40" name="state" type="choice">
            <choice>
                <element label="Processed" sequence="10" value="processed"/>
                <element label="Unprocessed" sequence="20" value="unprocessed"/>
            </choice>
        </element>
        <element label="Table name" max_length="80" name="table_name" type="table_name"/>
        <element label="Values" max_length="30000" name="values" type="string"/>
    </element>
</database>
```

One more thing to note here, By default we are inserting record with `Unprocessed` state and once we successfully migrated the record then only we move its state to `Processed` so Customers can easily identify which records has not been migrated/processed yet.

We are also handling Custom column customization in `cloneColumn` function of the script where we are creating custom columns on the target table.

If we want to completely deprecate the previous table then we have to update the fields where the previous table is being refered so we are handling this in `updateDictionaryReferences` function and once migartion is completed, we are deprecating the previosu table in `deprecateTable` function.

We are using `GlideRecordClassSwitcher`function to migrate records from one table to another but this will one migrate data of the columns which are common in both the tables heirarchy so for other fields we have to again populate them again. One important thing to note here is that `GlideRecordClassSwitcher` automatically remove record from the previous table and this will not impact `cascade_rule` of the other tables and **will create record in the new table with the same sys id** so we don't have to worry about references where the record has being references.
