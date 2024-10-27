# Enforce a 1:1 relationship between two tables

ServiceNow does not provide a direct means of establishing a one-to-one relationship between two tables. Even so, you can enforce a 1:1 relationship with a remote table using business rules.
When the local reference field is changed, add the current record reference to the new remote record if applicable and remove the current record reference from the old/previous remote record if applicable.  

NOTE: Don't forget to:  
    1) Add this BR to both local and remote tables and   
    2) Swap the local and remote field names on the opposing table.  

NOTE: The table names are not required as they are defined by the table on which this BR runs and the table defined in the reference field.  

Attribution: This function is adapted from the example described in Tim "@TheProfessor" Woodruff's book "Learning ServiceNow (Second Edition)" available from Pakt Publishing.  
  

## Business Rule
When: BEFORE INSERT or UPDATE
Advanced Script:
```javascript
( function( current, previous /*null when async*/ ) {

    var remote_record,
        local_field_name = 'u_my_local_field',
        remote_field_name = 'u_the_remote_field';

    // Set the reference on the current remote record.
    if ( !current[ local_field_name ].nil() ){
        remote_record = current[ local_field_name ].getRefRecord();
        remote_record.setValue( remote_field_name, current.getUniqueValue() );
        remote_record.update();
    }

    // Clear the reference on the previous remote record.
    if ( !previous[ local_field_name ].nil() ) {
        remote_record = previous[ local_field_name ].getRefRecord();
        remote_record.setValue( remote_field_name, '' );
        remote_record.update();
    }
    
} )( current, previous );
