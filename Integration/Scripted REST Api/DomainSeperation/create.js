/**
 *
 * This script is provided for **educational and demonstration purposes only**.
 * Please thoroughly **test in a dedicated development environment**
 * before deploying to production.
 *
 * -----------------------------------------------------------------------------
 * Script Purpose:
 * Creates a new Incident record under the same domain and company as the
 * currently logged-in user. Returns the generated incident number and domain.
 * -----------------------------------------------------------------------------
 *
 * @author  Anasuya Rampalli (anurampalli)
 * @version 1.0
 * @date    2025-10-08
 * @tested  On ServiceNow PDI (Personal Developer Instance)
 * @context Scripted REST API (process function)
 */

/**
 * Processes the incoming REST API request and creates an Incident
 * for the authenticated user within their domain.
 *
 * @param {RESTAPIRequest} request  - The incoming REST API request object containing JSON payload.
 * @param {RESTAPIResponse} response - The response object used to send results back to the client.
 *
 * Expected JSON Body:
 * {
 *   "short_description": "Issue description text"
 * }
 *
 * Response Example (Success):
 * {
 *   "status": "success",
 *   "incident_id": "INC0012345",
 *   "domain": "TOP/Child Domain"
 * }
 *
 * Response Example (Error):
 * {
 *   "error": {
 *     "message": "User Not Authenticated",
 *     "detail": "Required to provide Auth information"
 *   },
 *   "status": "failure"
 * }
 */
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
  var body = request.body.data;
  var companyName = body.company;
  var shortDesc = body.short_description;
  //gs.info(gs.getUserID());
  var userSysId = gs.getUserID();
  var result = {};

  try {
    // looup user
    var grUser = new GlideRecord("sys_user");
    grUser.addQuery("sys_id", userSysId.toString());
    grUser.query();
    if (grUser.next()) {
      var domain = grUser.sys_domain;
      // Create new incident
      var grIncident = new GlideRecord("incident");
      grIncident.initialize();
      grIncident.short_description = shortDesc;
      grIncident.caller_id = userSysId;
      gs.info("COMPANY: " + grUser.company.getDisplayValue());
      grIncident.company = grUser.company;
      grIncident.sys_domain = grUser.sys_domain; // domain reference comes from core_company
      grIncident.insert();

      let correlationId = grIncident.number;
      gs.info(
        "Domain Indcident API: inserted incident number: " + correlationId
      );
      result.status = "success";
      result.incident_id = correlationId;
      result.domain = grUser.sys_domain.getDisplayValue();
    } else {
      response.setStatus(404);
      result.status = "error";
      result.message = "User not found: " + companyName;
    }
  } catch (e) {
    response.setStatus(500);
    result.status = "error";
    result.message = e.message;
  }

  response.setBody(result);
})(request, response);

