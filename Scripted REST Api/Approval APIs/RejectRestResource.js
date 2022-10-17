  /**
   * Description : Approval API to reject the given approval record
	 * Resource Path : /api/swre/sr_approvals/{id}/reject
	 * HTTP method : POST
	 * @id : SysID of the record to be rejected
	 * @comment : Comment to be updated on the approval record
	 * @return JSON response
   **/

(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    var Id = request.pathParams.id;
    var bodyParams = request.body.data;
    var comment = bodyParams.comment.toString();
    return new SRApprovalsAPI(request, response).taskRejected(Id, comment);

})(request, response);
