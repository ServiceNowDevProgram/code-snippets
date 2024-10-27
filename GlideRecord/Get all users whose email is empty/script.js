(function () {
    var users = [];
    var userGr = new GlideRecord('sys_user'); // used different variable name instead of gr.
    userGr.addActiveQuery(); // used to filter more on the records fetched.
    userGr.addNullQuery('email');
    userGr.query();
    while (userGr.next()) {
        users.push(userGr.getDisplayValue()); // used getDisplayValue() method to get the name as a string instead of using gr.name
    }
    gs.info("Users without email are : " + users);

})(); // Used a self executing function to wrap the code with a function for reducing variable scoping issues
