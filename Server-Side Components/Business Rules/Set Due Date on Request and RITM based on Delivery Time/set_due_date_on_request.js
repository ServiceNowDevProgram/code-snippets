/**
 * Business Rule: Set due date on Request
 * Table: sc_request
 * When: before insert
 *
 * @description
 * Sets the "due_date" on a Request by:
 *  1) Finding the associated RITM with the highest "due_date".
 *  2) Assigning the Request's "due_date" to match that RITM's "due_date".
 */
(function executeRule(current, previous /* null when async */) {

    try {
        // Query RITMs linked to this Request and pick the one with the highest due_date.
        var reqGR = new GlideRecord("sc_req_item");
        reqGR.addQuery("request", current.getUniqueValue());
        reqGR.orderByDesc('due_date'); // Latest due_date first
        reqGR.setLimit(1);
        reqGR.query();

        if (reqGR.next()) {
			      // Set due date
            current.setValue('due_date', reqGR.getValue('due_date'));
        }

    } catch (ex) {
        var message = ex.getMessage();
        gs.error("Business Rule: Error - " + message);
    }

})(current, previous);
