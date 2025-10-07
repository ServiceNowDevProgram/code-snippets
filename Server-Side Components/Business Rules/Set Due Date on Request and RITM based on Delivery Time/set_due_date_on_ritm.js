/**
 * Business Rule: Set due date on RITM
 * Table: sc_req_item
 * When: before insert
 *
 * @description
 * Sets the "due_date" for a Request Item (RITM) by:
 *  1) Reading the delivery time (in days) from the associated Catalog Item
 *  2) Parsing the days component from the display value (e.g. "5 Days" - 5).
 *  3) Adding those days to the record's creation date ("sys_created_on").
 *  4) Writing the calculated date to "due_date".
 */
(function executeRule(current, previous /* null when async */) {

    try {
        //  Get days from Catalog Item's delivery time field.
        var deliveryTimeDaysStr = current.getDisplayValue('cat_item.delivery_time').split(' ')[0];

        // Convert to a Number
        var deliveryTimeDays = Number(deliveryTimeDaysStr);

        var createdDate = current.getValue('sys_created_on');
        var newDueDate = new GlideDateTime(createdDate);

        // Add delivery days to created date in UTC to avoid timezone drift.
        newDueDate.addDaysUTC(deliveryTimeDays);

		    // Set due date
        current.due_date.setValue(newDueDate.getValue());

        // If you also need the estimated delivery date, uncomment the line below:
        // current.estimated_delivery.setValue(newDueDate.getValue());

    } catch (ex) {
        var message = ex.getMessage();
        gs.error("Error in BR: Set Due Date on RITM - " + message);
    }

})(current, previous);
