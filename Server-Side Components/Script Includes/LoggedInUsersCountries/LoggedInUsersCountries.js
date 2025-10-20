var getLoggedUserCountryLocs = Class.create();
getLoggedUserCountryLocs.prototype = {
    initialize: function() {
    },
            getCountry: function() {

        gs.addInfoMessage(gs.getUserID());
        var gr = new GlideRecord('sys_user');
        gr.addQuery('sys_id', gs.getUserID());
        gr.query();
        if (gr.next()) {
            var loc = gr.location;
            var country = gr.location.country;
        }


        var grUsers = new GlideRecord('cmn_location');

        grUsers.addQuery('country', country);
        grUsers.query();
        var locs = "";
        while (grUsers.next()) {

            locs += grUsers.sys_id + ",";
        }
        gs.addInfoMessage(locs);
        var users = new GlideRecord('sys_user');
        users.addQuery('location', 'IN', locs);
        users.query();

        var l = "";
        while (users.next()) {

            l += users.sys_id + ",";

        }
        return 'sys_idIN' + l;
    },

    type: 'getLoggedUserCountryLocs'
};
