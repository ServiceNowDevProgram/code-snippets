/**
 * OAuth 2.0 Integration Pattern for ServiceNow
 * 
 * This script demonstrates how to implement OAuth 2.0 authentication
 * for external API integrations in ServiceNow.
 * 
 * @author: ServiceNow Community
 * @version: 1.0
 * @category: Integration/Authentication
 */

var OAuth2Integration = Class.create();
OAuth2Integration.prototype = {
    
    initialize: function() {
        this.client_id = gs.getProperty('oauth.client.id');
        this.client_secret = gs.getProperty('oauth.client.secret');
        this.redirect_uri = gs.getProperty('oauth.redirect.uri');
        this.auth_url = gs.getProperty('oauth.auth.url');
        this.token_url = gs.getProperty('oauth.token.url');
        this.scope = gs.getProperty('oauth.scope', 'read write');
    },
    
    /**
     * Generate authorization URL for OAuth 2.0 flow
     * @param {string} state - CSRF protection state parameter
     * @returns {string} Authorization URL
     */
    getAuthorizationUrl: function(state) {
        var params = {
            'response_type': 'code',
            'client_id': this.client_id,
            'redirect_uri': this.redirect_uri,
            'scope': this.scope,
            'state': state || this._generateState()
        };
        
        return this.auth_url + '?' + this._buildQueryString(params);
    },
    
    /**
     * Exchange authorization code for access token
     * @param {string} code - Authorization code from callback
     * @param {string} state - State parameter for validation
     * @returns {Object} Token response
     */
    exchangeCodeForToken: function(code, state) {
        try {
            // Validate state parameter (implement your validation logic)
            if (!this._validateState(state)) {
                throw new Error('Invalid state parameter');
            }
            
            var request = new sn_ws.RESTMessageV2();
            request.setEndpoint(this.token_url);
            request.setHttpMethod('POST');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            var body = this._buildQueryString({
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': this.redirect_uri,
                'client_id': this.client_id,
                'client_secret': this.client_secret
            });
            
            request.setRequestBody(body);
            
            var response = request.execute();
            var responseBody = response.getBody();
            var statusCode = response.getStatusCode();
            
            if (statusCode === 200) {
                var tokenData = JSON.parse(responseBody);
                this._storeTokens(tokenData);
                return {
                    success: true,
                    data: tokenData
                };
            } else {
                gs.error('OAuth2Integration: Token exchange failed with status ' + statusCode + ': ' + responseBody);
                return {
                    success: false,
                    error: 'Token exchange failed',
                    status: statusCode,
                    details: responseBody
                };
            }
            
        } catch (e) {
            gs.error('OAuth2Integration: Exception during token exchange: ' + e.message);
            return {
                success: false,
                error: e.message
            };
        }
    },
    
    /**
     * Refresh access token using refresh token
     * @param {string} refreshToken - Refresh token
     * @returns {Object} New token response
     */
    refreshAccessToken: function(refreshToken) {
        try {
            var request = new sn_ws.RESTMessageV2();
            request.setEndpoint(this.token_url);
            request.setHttpMethod('POST');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            var body = this._buildQueryString({
                'grant_type': 'refresh_token',
                'refresh_token': refreshToken,
                'client_id': this.client_id,
                'client_secret': this.client_secret
            });
            
            request.setRequestBody(body);
            
            var response = request.execute();
            var responseBody = response.getBody();
            var statusCode = response.getStatusCode();
            
            if (statusCode === 200) {
                var tokenData = JSON.parse(responseBody);
                this._storeTokens(tokenData);
                return {
                    success: true,
                    data: tokenData
                };
            } else {
                return {
                    success: false,
                    error: 'Token refresh failed',
                    status: statusCode,
                    details: responseBody
                };
            }
            
        } catch (e) {
            gs.error('OAuth2Integration: Exception during token refresh: ' + e.message);
            return {
                success: false,
                error: e.message
            };
        }
    },
    
    /**
     * Make authenticated API request
     * @param {string} url - API endpoint URL
     * @param {string} method - HTTP method
     * @param {Object} data - Request payload
     * @param {Object} headers - Additional headers
     * @returns {Object} API response
     */
    makeAuthenticatedRequest: function(url, method, data, headers) {
        try {
            var accessToken = this._getStoredAccessToken();
            
            if (!accessToken || this._isTokenExpired()) {
                var refreshResult = this.refreshAccessToken(this._getStoredRefreshToken());
                if (!refreshResult.success) {
                    return {
                        success: false,
                        error: 'Unable to refresh access token'
                    };
                }
                accessToken = refreshResult.data.access_token;
            }
            
            var request = new sn_ws.RESTMessageV2();
            request.setEndpoint(url);
            request.setHttpMethod(method || 'GET');
            request.setRequestHeader('Authorization', 'Bearer ' + accessToken);
            request.setRequestHeader('Content-Type', 'application/json');
            
            // Add custom headers
            if (headers) {
                for (var header in headers) {
                    request.setRequestHeader(header, headers[header]);
                }
            }
            
            // Add request body for POST/PUT requests
            if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
                request.setRequestBody(JSON.stringify(data));
            }
            
            var response = request.execute();
            var responseBody = response.getBody();
            var statusCode = response.getStatusCode();
            
            if (statusCode >= 200 && statusCode < 300) {
                return {
                    success: true,
                    data: JSON.parse(responseBody),
                    status: statusCode
                };
            } else {
                return {
                    success: false,
                    error: 'API request failed',
                    status: statusCode,
                    details: responseBody
                };
            }
            
        } catch (e) {
            gs.error('OAuth2Integration: Exception during authenticated request: ' + e.message);
            return {
                success: false,
                error: e.message
            };
        }
    },
    
    /**
     * Generate CSRF protection state parameter
     * @returns {string} Random state string
     * @private
     */
    _generateState: function() {
        return gs.generateGUID();
    },
    
    /**
     * Validate state parameter
     * @param {string} state - State to validate
     * @returns {boolean} Validation result
     * @private
     */
    _validateState: function(state) {
        // Implement your state validation logic
        // For example, check against stored session state
        var storedState = gs.getSession().getProperty('oauth_state');
        return state === storedState;
    },
    
    /**
     * Build query string from parameters object
     * @param {Object} params - Parameters object
     * @returns {string} URL encoded query string
     * @private
     */
    _buildQueryString: function(params) {
        var queryParts = [];
        for (var key in params) {
            if (params.hasOwnProperty(key) && params[key] !== null && params[key] !== undefined) {
                queryParts.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
            }
        }
        return queryParts.join('&');
    },
    
    /**
     * Store OAuth tokens securely
     * @param {Object} tokenData - Token response data
     * @private
     */
    _storeTokens: function(tokenData) {
        // Store tokens in encrypted system properties or credential store
        var encryption = new GlideEncrypter();
        
        gs.setProperty('oauth.access.token', encryption.encrypt(tokenData.access_token));
        
        if (tokenData.refresh_token) {
            gs.setProperty('oauth.refresh.token', encryption.encrypt(tokenData.refresh_token));
        }
        
        if (tokenData.expires_in) {
            var expiryTime = new GlideDateTime();
            expiryTime.addSeconds(parseInt(tokenData.expires_in) - 60); // 1 minute buffer
            gs.setProperty('oauth.token.expiry', expiryTime.toString());
        }
    },
    
    /**
     * Retrieve stored access token
     * @returns {string} Decrypted access token
     * @private
     */
    _getStoredAccessToken: function() {
        var encryptedToken = gs.getProperty('oauth.access.token');
        if (encryptedToken) {
            var encryption = new GlideEncrypter();
            return encryption.decrypt(encryptedToken);
        }
        return null;
    },
    
    /**
     * Retrieve stored refresh token
     * @returns {string} Decrypted refresh token
     * @private
     */
    _getStoredRefreshToken: function() {
        var encryptedToken = gs.getProperty('oauth.refresh.token');
        if (encryptedToken) {
            var encryption = new GlideEncrypter();
            return encryption.decrypt(encryptedToken);
        }
        return null;
    },
    
    /**
     * Check if stored access token is expired
     * @returns {boolean} True if token is expired
     * @private
     */
    _isTokenExpired: function() {
        var expiryString = gs.getProperty('oauth.token.expiry');
        if (!expiryString) {
            return true; // Assume expired if no expiry info
        }
        
        var expiryTime = new GlideDateTime(expiryString);
        var currentTime = new GlideDateTime();
        
        return currentTime.after(expiryTime);
    },
    
    type: 'OAuth2Integration'
};

// Usage Example:
/*
var oauth = new OAuth2Integration();

// Step 1: Get authorization URL
var authUrl = oauth.getAuthorizationUrl('unique_state_value');
gs.info('Redirect user to: ' + authUrl);

// Step 2: Handle callback (in a different script/processor)
var tokenResult = oauth.exchangeCodeForToken(code, state);
if (tokenResult.success) {
    gs.info('OAuth setup successful');
    
    // Step 3: Make authenticated requests
    var apiResult = oauth.makeAuthenticatedRequest(
        'https://api.example.com/data',
        'GET'
    );
    
    if (apiResult.success) {
        gs.info('API data: ' + JSON.stringify(apiResult.data));
    }
}
*/
