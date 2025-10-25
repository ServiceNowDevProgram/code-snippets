// ========================================
// SCRIPT INCLUDE (SERVER-SIDE)
// ========================================
// Name: LocationUtilsAjax
// API Name: LocationUtilsAjax
// Client callable: TRUE (checked)
// Active: TRUE (checked)
// ========================================

var LocationUtilsAjax = Class.create();
LocationUtilsAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    
    getUserLocation: function() {
        var userId = this.getParameter('sysparm_user_id');
        var result = {};
        
        if (userId) {
            // Get user record
            var userGR = new GlideRecord('sys_user');
            if (userGR.get(userId)) {
                // Get location reference
                if (!userGR.location.nil()) {
                    // Get location details from cmn_location table
                    var locGR = new GlideRecord('cmn_location');
                    if (locGR.get(userGR.location)) {
                        result.location = locGR.name.toString();
                        result.city = locGR.city.toString();
                        result.state = locGR.state.toString();
                        result.country = locGR.country.toString();
                    }
                }
            }
        }
        
        return JSON.stringify(result);
    },
    
    type: 'LocationUtilsAjax'
});