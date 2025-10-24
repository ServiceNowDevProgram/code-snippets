(function runMailScript( /* GlideRecord */ current, /* TemplatePrinter */ template,
    /* Optional EmailOutbound */
    email, /* Optional GlideRecord */ email_action,
    /* Optional GlideRecord */
    event) {


    // Add your code here
    var grp = new GlideRecord('sys_user_grmember');  //Query to the group member table
    grp.addQuery("group", current.assignment_group);   //add a filter to query based on the current record's assignment group
    grp.query();
    while (grp.next()) {
       email.addAddress('cc', grp.user.email, grp.user.name); //Passing email as name and 2nd and 3rd parameter
    }




})(current, template, email, email_action, event);
