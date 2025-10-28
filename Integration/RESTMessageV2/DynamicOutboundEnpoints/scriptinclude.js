
//Create a sample system Property called x_my_scope.api.endpoints having below object as example. make sure your company instance includes those key such as dev,prod,test or modify it with your instance name

// {
//   "dev": "https://dev-instance.example.com/api",
//   "test": "https://test-instance.example.com/api",
//   "prod": "https://prod-instance.example.com/api"
// }

var EndpointConfig = Class.create();
EndpointConfig.prototype = {
    initialize: function() {
        // No hardcoded object here. It will be fetched from the System Property.
    },

    getEndpoint: function() {
        var propertyName = 'x_my_scope.api.endpoints';
        var endpointObjectStr = gs.getProperty(propertyName);  
        if (gs.nil(endpointObjectStr)) {
            gs.error("EndpointConfig: System property '" + propertyName + "' not found or is empty.");
            return null;
        }

        try {
            var endpoints = JSON.parse(endpointObjectStr);
            var instanceName = gs.getProperty('instance_name');
            var environmentKey;

            if (instanceName.includes('dev')) {
                environmentKey = 'dev';
            } else if (instanceName.includes('test') || instanceName.includes('uat')) {
                environmentKey = 'test';
            } else if (instanceName.includes('prod')) {
                environmentKey = 'prod';
            } else {
                gs.error("EndpointConfig: Could not determine environment for instance '" + instanceName + "'.");
                return null;
            }

            if (endpoints.hasOwnProperty(environmentKey)) {
                return endpoints[environmentKey];
            } else {
                gs.error("EndpointConfig: Configuration not found for environment '" + environmentKey + "'.");
                return null;
            }

        } catch (ex) {
            gs.error("EndpointConfig: Failed to parse JSON from system property '" + propertyName + "'. Exception: " + ex);
            return null;
        }
    },

    type: 'EndpointConfig'
};
