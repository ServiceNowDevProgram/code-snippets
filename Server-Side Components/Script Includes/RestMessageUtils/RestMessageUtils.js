var RestMessageUtils = Class.create();
RestMessageUtils.prototype = {
    initialize: function(rmObj, restMessage, restFunc) {
        this.RM = (restFunc && restMessage) ? new sn_ws.RESTMessageV2(restMessage, restFunc) : new sn_ws.RESTMessageV2();
        this.rmObj = rmObj;
    },

    checkAndGetKeyValue: function(obj, key) {
        return obj.hasOwnProperty(key);

    },

    setQueryParams: function() {
        if (this.checkAndGetKeyValue(this.rmObj, 'queryParams'))
            for (var i in this.rmObj.queryParams)
                this.RM.setQueryParameter(i, this.rmObj.queryParams[i]);

    },

    variableSubs: function() {
        if (this.checkAndGetKeyValue(this.rmObj, 'variableInfo'))
            for (var i in this.rmObj.variableInfo)
                this.RM.setStringParameterNoEscape(i, this.rmObj.variableInfo[i]);
    },

    setAuth: function() {
        var authType = this.rmObj.authType;

        if (authType) {
            if (authType == 'APIKEY')
                return;
            else if (authType == 'BasicCreds')
                this.RM.setBasicAuth(this.rmObj.userName, this.rmObj.password);
            else if (authType == 'BasicAuthProfile')
                this.RM.setAuthenticationProfile('basic', this.rmObj.authProfile);

        }

    },

    setRequestBody: function() {
        if (this.checkAndGetKeyValue(this.rmObj, 'requestBody'))
            this.RM.setRequestBody(typeof this.rmObj.requestBody == 'object' ? JSON.stringify(this.rmObj.requestBody) : this.rmObj.requestBody);
    },

    setRequestHeaders: function() {
        if (this.checkAndGetKeyValue(this.rmObj, 'requestHeaders'))
            for (var i in this.rmObj.requestHeaders)
                this.RM.setRequestHeader(i, this.rmObj.requestHeaders[i]);
    },

    setMidServer: function() {
        if (this.checkAndGetKeyValue(this.rmObj, 'midServer'))
            this.RM.setMidServer(this.rmObj.midServer);
    },

    setEndpoint: function() {
        if (this.checkAndGetKeyValue(this.rmObj, 'endPoint'))
            this.RM.setEndpoint(this.rmObj.endPoint);
    },
    setHttpMethod: function() {
        if (this.checkAndGetKeyValue(this.rmObj, 'httpMethod'))
            this.RM.setHttpMethod(this.rmObj.httpMethod);
    },

    execute: function() {
        try {
            this.setHttpMethod();
            this.setEndpoint();
            this.setRequestHeaders();
            this.setAuth();
            this.setRequestBody();
            this.setQueryParams();
            this.variableSubs();
            this.setMidServer();
            return this.RM.execute();
        } catch (err) {
            gs.error('REST Message execution failed: ' + err);
        }

    },


    type: 'RestMessageUtils'
};
