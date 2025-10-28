(function executeRule(current, previous /*null when async*/) {
   
    // Ensure the 'watch_list' (replace with applicable field name) field has been modified
    if (current.watch_list != previous.watch_list) {
        
        // Split the current and previous watch lists into arrays
        var newWatchers = current.watch_list.split(',');
        var oldWatchers = previous.watch_list ? previous.watch_list.split(',') : [];

        // Identify the newly added users to the watch list
        var addedUsers = newWatchers.filter(function (user) {
            return oldWatchers.indexOf(user) === -1;
        });

        // Loop through the added users to trigger the event for each
        addedUsers.forEach(function(userID) {
            var email;
            var firstName;

            // Try to get the user record by user ID (sys_id)
            var userGr = new GlideRecord('sys_user');
            if (userGr.get(userID)) {
                firstName = userGr.first_name;
                email = userGr.email;
            } else {
                
                // If no user record is found, assume the userID is an email address
                email = userID;
                firstName = "Team";
            }

            // Trigger the event (replace "new_member") with the current case and user information
            gs.eventQueue('new_member', current, email, firstName);
        });
    }
})(current, previous);
