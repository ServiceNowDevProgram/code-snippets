## getFields using GlideRecordUtil class
The GlideRecordUtil class is available in server-side scripts. It returns an array of all the fields in the specified GlideRecord.

**Use Case**

If you're trying return all the fields for any table then you can use GlideRecordUtil - getFields(GlideRecord gr) method whcih returns an array of all the fields in the specified GlideRecord.

**Note:** If there is a field name which is the same as the table name, the getFields() method does not return the value of the field.
