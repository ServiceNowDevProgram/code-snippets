/**
 * Approve On Behalf Scripted REST API
 * This API allows authorized users to approve or reject tasks on behalf of another user.
 * It handles impersonation, performs actions on approval records, and returns appropriate responses.
 *
 * @param {RESTAPIRequest} request - The request object containing data from the client
 * @param {RESTAPIResponse} response - The response object to send data back to the client
 */
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    try {
        // Parse request data
        var reqData = JSON.parse(request.body.dataString);
        var reqId = reqData.approvalRecId;
        var user = reqData.userId;
        var action = reqData.action;
        var comments = reqData.comments;

        // Validate input
        if (!reqId || !user || !action) {
            return respondWithError(response, "Missing required fields: approvalRecId, userId, or action.");
        }

        // Check impersonation rights
        var canImpers = new GlideImpersonate().canImpersonate(user);
        if (!canImpers) {
            return respondWithError(response, "Cannot impersonate user " + user);
        }

        // Impersonate the user
        var impUser = new GlideImpersonate();
        impUser.impersonate(user);

        // Fetch the approval record
        var approvalGR = new GlideRecord('sysapproval_approver');
        if (!approvalGR.get(reqId)) {
            return respondWithError(response, "Invalid approval record ID: " + reqId);
        }

        // Perform action based on the request (approve/reject)
        if (action.toLowerCase() === 'approve') {
            approvalGR.state = 'approved';
        } else if (action.toLowerCase() === 'reject') {
            approvalGR.state = 'rejected';
        } else {
            return respondWithError(response, "Invalid action specified. Valid actions are 'approve' or 'reject'.");
        }

        // Add comments if provided
        if (comments) {
            approvalGR.comments = comments;
        }

        // Update the record
        approvalGR.update();

        // Response success
        response.setStatus(200);
        response.setHeader('Content-Type', 'application/json');
        response.setBody({ "success": true, "message": "Action '" + action + "' performed successfully on approval record." });

    } catch (e) {
        // Handle errors and respond
        respondWithError(response, "An error occurred: " + e.message);
    }

    /**
     * Helper function to respond with error
     * Sends a consistent error response to the client with a status of 400.
     *
     * @param {RESTAPIResponse} response - The response object to send data back to the client
     * @param {string} message - The error message to respond with
     */
    function respondWithError(response, message) {
        response.setStatus(400);
        response.setHeader('Content-Type', 'application/json');
        response.setBody({ "success": false, "message": message });
    }
})(request, response);
