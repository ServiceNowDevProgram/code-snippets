var cf_LiveProfile = Class.create();
cf_LiveProfile.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    /*
    * Retrieves the user photo from the Live Profile, if possible, otherwise
    * gets the photo from the user record if possible.
    *
    * Returns the path to the photo or an empty string
    */
    getPhoto: function(){
        // Get the Sys ID of the user that we're retrieving the photo for
        var user_id = this.getParameter('sysparm_user_id');
        gs.log("getPhoto called for: " + user_id, "cf_LiveProfile");
        var photo_path;
       
        // Query for the live profile record
        var live_profile_gr = new GlideRecord('live_profile');
        live_profile_gr.addQuery('document', user_id);
        live_profile_gr.query();
        if(live_profile_gr.next()) {
            if(live_profile_gr.photo.getDisplayValue()){
                photo_path = live_profile_gr.photo.getDisplayValue();
                gs.log("Retrieved photo from live profile: " + photo_path, "cf_LiveProfile");

            }
        }
        // Check to see if we have a photo from the profile
        if(!photo_path){
            // No profile photo found, query for the user photo
            var user_gr = new GlideRecord('sys_user');
            user_gr.addQuery('sys_id', user_id);
            user_gr.query();
            if(user_gr.next()) {
                photo_path = user_gr.photo.getDisplayValue();
                gs.log("Retrieved photo from user record: " + photo_path, "cf_LiveProfile");
            } else {
                photo_path = '';
                gs.log("No photo found", "cf_LiveProfile");
            }
        }
        return photo_path;
    },

    type: 'cf_LiveProfile'
});
