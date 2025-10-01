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
