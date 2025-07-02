(function () {
    var groups = [];
    var groupGr = new GlideRecord('sys_user_group'); 
    groupGr.addActiveQuery(); 
    groupGr.addNullQuery('manager');
    groupGr.query();
    while (groupGr.next()) {
        groups.push(groupGr.getDisplayValue()); // used getDisplayValue() method to get the name as a string instead of using groupGr.name
    }
    gs.info("Groups without manager are : " + groups);

})(); 
