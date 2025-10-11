/**
 * @summary Handles the Scripted REST API Resource for retrieving CI Group from the CMDB API.
 * @description This function is a part of a scripted REST API resource. It acts as an endpoint handler, 
 *              processing incoming REST API requests and producing appropriate responses. In this case, 
 *              it handles requests to retrieve Configuration Item (CI) Groups from the Configuration 
 *              Management Database (CMDB) API. 
 */
(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    return new CmdbApi(request, response).getCiGroup();

})(request, response);
