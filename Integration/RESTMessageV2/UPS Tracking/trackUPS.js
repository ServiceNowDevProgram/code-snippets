(function executeUPSLookup() {
    try {
        var trackingNumber = '1Z12345E1512345676'; // replace or pass as a variable

        // Step 1: Get OAuth token from UPS
        var tokenRequest = new sn_ws.RESTMessageV2();
        tokenRequest.setEndpoint('https://wwwcie.ups.com/security/v1/oauth/token');
        tokenRequest.setHttpMethod('POST');
        tokenRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        tokenRequest.setBasicAuth('YOUR_CLIENT_ID', 'YOUR_CLIENT_SECRET');
        tokenRequest.setRequestBody('grant_type=client_credentials');

        var tokenResponse = tokenRequest.execute();
        var tokenBody = tokenResponse.getBody();
        var tokenObj = JSON.parse(tokenBody);
        var accessToken = tokenObj.access_token;

        gs.info('UPS OAuth token retrieved successfully.');

        // Step 2: Use token to request tracking info
        var trackingRequest = new sn_ws.RESTMessageV2();
        trackingRequest.setEndpoint('https://wwwcie.ups.com/api/track/v1/details/' + trackingNumber);
        trackingRequest.setHttpMethod('GET');
        trackingRequest.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        trackingRequest.setRequestHeader('transId', gs.generateGUID());
        trackingRequest.setRequestHeader('transactionSrc', 'ServiceNow');

        var trackingResponse = trackingRequest.execute();
        var trackingBody = trackingResponse.getBody();
        var trackingObj = JSON.parse(trackingBody);

        gs.info('UPS Tracking Info: ' + JSON.stringify(trackingObj, null, 2));

        // Example: log current status
        if (trackingObj.trackResponse && trackingObj.trackResponse.shipment) {
            var shipment = trackingObj.trackResponse.shipment[0];
            var status = shipment.package[0].activity[0].status.description;
            gs.info('Current Status: ' + status);
        }
    } catch (ex) {
        gs.error('Error pulling UPS tracking info: ' + ex.message);
    }
})();
