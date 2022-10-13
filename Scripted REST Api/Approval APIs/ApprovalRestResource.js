  /**
         * Description : Approval API to approve the given approval record
	 * Resource Path : /api/swre/sr_approvals/{id}/approve
	 * HTTP method : POST
	 * @id : SysID of the record to be approved
	 * @comment : Comment to be updtaed on the approval record
	 * @return JSON response
   **/

(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    var Id = request.pathParams.id; // SysID of the approval record
    var bodyParams = request.body.data;
    var comment = bodyParams.comment.toString(); // Comments to be updated on approval record
    return new SRApprovalsAPI(request, response).taskApproved(Id, comment);

})(request, response);
