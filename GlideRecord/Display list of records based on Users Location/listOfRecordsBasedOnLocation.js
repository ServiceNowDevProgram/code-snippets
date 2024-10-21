// Business Rule to display the list of records based on the user's location

When to Run - Before Query
Table - Any table in which you want to perform this script
Scripts - 
(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here
    var current_user = gs.getUserID();

    var usr = new GlideRecord('sys_user'); // Query User Table
    usr.addQuery('sys_id', current_user);
    usr.query();
    if (usr.next()) {
        if (usr.location != '') {
        current.addQuery('location=' + usr.location); // Querying the user's location with current record location 
    }
    }
})(current, previous);
