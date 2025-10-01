var UserHelper = Class.create();
UserHelper.prototype = {
    SECRET_KEY: '<YOUR_SECRET_KEY>', //secret key defined by you for encoding
    MAC_ALG: 'HmacSHA256',
    GLIDE_SSO_ID: '<SSO_PROVIDER_SYS_ID>', //system id of digest token sso provider

    initialize: function(userGR) {
        this.userGR = userGR;
    },

    getUserById: function(sys_id) {
        return this.getUser('sys_id', sys_id);
    },

    getUserByEmail: function(email) {
        return this.getUser('email', email);
    },

    getUserByName: function(user_name) {
        return this.getUser('user_name', user_name);
    },

    getUser: function(key, value) {
        if (key && value) {
            this.userGR = new GlideRecord('sys_user');
            this.userGR.get(key, value);
        }
        return this.userGR;
    },

    //generate the direct login url using user_name or user glide record
    login: function(user_name) {

        if (user_name) {
            this.getUserByName(user_name);
        }

        if (!this.userGR) {
            return null;
        }

        //generating token
        var token = SncAuthentication.encode(this.userGR.getValue('user_name'), this.SECRET_KEY, this.MAC_ALG);

        //formating url
        var url = gs.getProperty('glide.servlet.uri') + '?glide_sso_id=' + this.GLIDE_SSO_ID + '&SM_USER=' + this.userGR.getValue('user_name') + '&DE_USER=' + token;

        return url;
    },

    type: 'UserHelper'
};
