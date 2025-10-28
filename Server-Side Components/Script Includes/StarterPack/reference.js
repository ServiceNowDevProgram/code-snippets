/*
Usage: in a Reference Field  to the User table set the Ref Qual to Advanced and paste this in
               javascript: 'sys_idIN'+new.StarterPackRef().getAdmins();
*/


var StarterPackRef = Class.create();
StarterPackRef.prototype = {
    initialize: function() {},

    getAdmins: function() {
        var users = {};
        var grHasRole = new GlideRecord('sys_user_has_role');
        grHasRole.addEncodedQuery('role=2831a114c611228501d4ea6c309d626d'); //admin
        grHasRole.query();
        while (grHasRole.next()) {
            users[grHasRole.user.toString()] = true;
        }
        var ids = [];
        for (var id in users)
            ids.push(id);
        return ids.join(',');
    },

    type: 'StarterPackRef'
};
