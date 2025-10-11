(function executeRule(current, previous /*null when async*/ ) {
    //Script to read and update specific system properties (in this example to update last created user name with role admin)

    //Get value of property which you would like to verify
    var updateAdminUser = gs.getProperty('user.updateNewAdminUsers');

    //Verify if property is set to true
    if (updateAdminUser) {

        //Get property which you would like to update
        var property = new GlideRecord('sys_properties');
        property.addQuery('name', 'user.lastCreatedAdmin');
        property.query();
        if (property.next()) {

            //Update value of choosed property
            property.value = current.user.getDisplayValue();
            property.update();
        }
    }
})(current, previous);
