var UserLocationUtils = Class.create();
UserLocationUtils.prototype = {
    initialize: function() {

    },
    getUserLocationCoords: function() {
        var user = gs.getUser();
        var loc = user.getRecord().location;
        if (loc) {
            var locGR = new GlideRecord('cmn_location');
            if (locGR.get(loc))
                return {
                    latitude: parseFloat(locGR.latitude),
                    longitude: parseFloat(locGR.longitude),
                    name: locGR.name.toString()
                };
        }
        return null;
    },

    type: 'UserLocationUtils'
};
