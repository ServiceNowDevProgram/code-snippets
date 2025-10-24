
class OAuthTokenHelper {

    /**
     * Returns the access token and refresh token for the given OAuth profile id and credentials
     * @param {String} oauth_profile_id - The sys_id of the OAuth profile
     * @param {String} oAuth_Application_Registry_Name - The name of the OAuth application registry record (oauth_entity)
     * @param {String} requestor_context - Context of the request e.g. Sales Order 
     * @param {String} requestor_id - user ID of the sys_user who requests
     * @param {String} username - the username to use for the password grant
     * @param {String} password - the password to use for the password grant
     * @return {Object} an object with accessToken and refreshToken properties
     */
    getRefreshAndAccessTokens(oauth_profile_id, requestor_context, requestor_id, username, password) {
        if (!oauth_profile_id) {
            throw gs.getMessage("oauth_profile_id is a required parameter");
        }
        if (!requestor_context) {
            throw gs.getMessage("requestor_context is a required parameter");
        }
        if (!requestor_id) {
            throw gs.getMessage("requestor_id is a required parameter");
        }
        if (!username) {
            throw gs.getMessage("username is a required parameter");
        }
        if (!password) {
            throw gs.getMessage("password is a required parameter");
        }

        let oAuthClient = new sn_auth.GlideOAuthClient();
        let params = {
            grant_type: "password",
            username: username,
            password: password,
            oauth_requestor_context: requestor_context,
            oauth_requestor: requestor_id,
            oauth_provider_profile: oauth_profile_id
        };

        let json = new global.JSON();
        let text = json.encode(params);
        let tokenResponse = oAuthClient.requestToken(oAuth_Application_Registry_Name, text); // is the name of the OAuth application registry record (oauth_entity)
        let token = tokenResponse.getToken();
        let accessToken = token.getAccessToken();
        let refreshToken = token.getRefreshToken();

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    }


    /**
     * Returns the access token based on the refresh token
     * @param {String} oauth_profile_id - The sys_id of the OAuth profile (oauth_entity_profile)
     * @param {String} oAuth_Application_Registry_Name - The name of the OAuth application registry record (oauth_entity)
     * @param {String} requestor_context - Context of the request e.g. Sales Order
     * @param {String} requestor_id - user ID of the sys_user who requests
     * @param {String} refreshToken - the refresh token to use for the refresh token grant
     * @return {Object} an object with accessToken and refreshToken properties
     */
    getAccessToken(oauth_profile_id, oAuth_Application_Registry_Name, requestor_context, requestor_id, refreshToken) {
        if (!oauth_profile_id) {
            throw "oauth_profile_id is a required parameter";
        }
        if (!requestor_context) {
            throw "requestor_context is a required parameter";
        }
        if (!requestor_id) {
            throw "requestor_id is a required parameter";
        }
        if (!refreshToken) {
            throw "refreshToken is a required parameter";
        }

        let oAuthClient = new sn_auth.GlideOAuthClient();
        let params = {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            oauth_requestor_context: requestor_context,
            oauth_requestor: requestor_id,
            oauth_provider_profile: oauth_profile_id
        };

        let json = new global.JSON();
        let text = json.encode(params);
        let tokenResponse = oAuthClient.requestToken(oAuth_Application_Registry_Name, text); // the name of the OAuth application registry record (oauth_entity)
        let token = tokenResponse.getToken();
        let access_Token = token.getAccessToken();
        let refresh_Token = token.getRefreshToken();

        return {
            accessToken: access_Token,
            refreshToken: refresh_Token
        };
    }


}

