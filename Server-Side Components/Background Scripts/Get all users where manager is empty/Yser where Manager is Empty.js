(function() {
    var users = [];
    var userGr = new GlideRecord('sys_user'); // used different variable name instead of gr.
    userGr.addActiveQuery(); // only active users
    userGr.addNullQuery('manager'); // users with no manager
    userGr.query();

    var count = 0; // Initialize count

    while (userGr.next()) {
        // Include Sys ID along with display name
        users.push('\n' + userGr.getDisplayValue() + ' (Sys ID: ' + userGr.getUniqueValue() + ')');
        count++; // Increment count
    }

    gs.info("Users without manager are: " + users.join(''));
    gs.info("Total users without manager: " + count);
})();
