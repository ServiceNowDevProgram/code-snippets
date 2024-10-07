(function() {
    // Check if the 'assignment_group' field is populated on the current record.
    // If not, display an error message and redirect back to the current incident form.
    if (!current.assignment_group) {
        gs.addErrorMessage('Assignment group is mandatory before conversion.');
        action.setRedirectURL(current);
        return;
    }

    // Check if the 'assigned_to' field is populated on the current record.
    // If not, display an error message and redirect back to the current incident form.
    if (!current.assigned_to) {
        gs.addErrorMessage('Assigned to is mandatory before conversion.');
        action.setRedirectURL(current);
        return;
    }

    // Define the Sys ID for the catalog item you want to add to the cart.
    var catalogItemSysId = 'ad01c2ce3b824610399b84fa26e45af7';

    // Create a new cart and add the specified catalog item to it.
    var cart = new Cart();
    var item = cart.addItem(catalogItemSysId, 1);

    // Set catalog item variables based on the current incident record's fields.
    cart.setVariable(item, "requested_for", current.caller_id);
    cart.setVariable(item, "requested_by", current.opened_by);
    cart.setVariable(item, "priority", current.priority);
    cart.setVariable(item, "best_method_of_contact", current.contact_type);
    cart.setVariable(item, "requested_for_location", "");
    cart.setVariable(item, "short_description", current.short_description);
    cart.setVariable(item, "description", current.description);
    cart.setVariable(item, "category", current.category);
    cart.setVariable(item, "subcategory", current.subcategory);
    cart.setVariable(item, "applicationname", current.u_application_name);

    // Place the order and get a reference to the created request.
    var rc = cart.placeOrder();

    // Update the request with location and other incident details.
    var req = new GlideRecord('sc_request');
    req.addQuery('sys_id', rc.sys_id);
    req.query();
    if (req.next()) {
        req.location = current.location;
        req.update();

        // Update the requested item with the configuration item (CI).
        var reqItemGR = new GlideRecord('sc_req_item');
        reqItemGR.addQuery('request', rc.sys_id);
        reqItemGR.query();
        if (reqItemGR.next()) {
            reqItemGR.cmdb_ci = current.cmdb_ci;
            reqItemGR.update();

            // Copy all work notes from the incident to the requested item.
            var incidentJournalGR = new GlideRecord('sys_journal_field');
            incidentJournalGR.addQuery('element_id', current.sys_id);
            incidentJournalGR.addQuery('element', 'work_notes');
            incidentJournalGR.query();
            while (incidentJournalGR.next()) {
                var newJournalEntry = new GlideRecord('sys_journal_field');
                newJournalEntry.initialize();
                newJournalEntry.element_id = reqItemGR.sys_id;
                newJournalEntry.element = 'work_notes';
                newJournalEntry.value = incidentJournalGR.value;
                newJournalEntry.sys_created_by = incidentJournalGR.sys_created_by;
                newJournalEntry.sys_created_on = incidentJournalGR.sys_created_on;
                newJournalEntry.update();
            }

            // Copy all additional comments from the incident to the requested item.
            incidentJournalGR.initialize();
            incidentJournalGR.addQuery('element_id', current.sys_id);
            incidentJournalGR.addQuery('element', 'comments');
            incidentJournalGR.query();
            while (incidentJournalGR.next()) {
                var newJournalEntry = new GlideRecord('sys_journal_field');
                newJournalEntry.initialize();
                newJournalEntry.element_id = reqItemGR.sys_id;
                newJournalEntry.element = 'comments';
                newJournalEntry.value = incidentJournalGR.value;
                newJournalEntry.sys_created_by = incidentJournalGR.sys_created_by;
                newJournalEntry.sys_created_on = incidentJournalGR.sys_created_on;
                newJournalEntry.update();
            }

            // Move all attachments from the incident to the request item.
            var attachment = new GlideSysAttachment();
            var attachments = attachment.getAttachments('incident', current.sys_id);
            while (attachments.next()) {
                attachment.copy('incident', current.sys_id, 'sc_req_item', reqItemGR.sys_id);
            }

            // Find the associated tasks for the request item and update each task with incident details.
            var taskGR = new GlideRecord('sc_task');
            taskGR.addQuery('request_item', reqItemGR.sys_id);
            taskGR.query();
            if (taskGR.next()) {
                taskGR.work_notes = "Converted from Incident " + current.number;
                taskGR.cmdb_ci = current.cmdb_ci;
                taskGR.assignment_group = current.assignment_group;
                taskGR.assigned_to = current.assigned_to;
                taskGR.priority = current.priority;
                taskGR.update();

                // Copy work notes from the incident to the task.
                incidentJournalGR.initialize();
                incidentJournalGR.addQuery('element_id', current.sys_id);
                incidentJournalGR.addQuery('element', 'work_notes');
                incidentJournalGR.query();
                while (incidentJournalGR.next()) {
                    var newJournalEntry = new GlideRecord('sys_journal_field');
                    newJournalEntry.initialize();
                    newJournalEntry.element_id = taskGR.sys_id;
                    newJournalEntry.element = 'work_notes';
                    newJournalEntry.value = incidentJournalGR.value;
                    newJournalEntry.sys_created_by = incidentJournalGR.sys_created_by;
                    newJournalEntry.sys_created_on = incidentJournalGR.sys_created_on;
                    newJournalEntry.update();
                }

                // Copy additional comments from the incident to the task.
                incidentJournalGR.initialize();
                incidentJournalGR.addQuery('element_id', current.sys_id);
                incidentJournalGR.addQuery('element', 'comments');
                incidentJournalGR.query();
                while (incidentJournalGR.next()) {
                    var newJournalEntry = new GlideRecord('sys_journal_field');
                    newJournalEntry.initialize();
                    newJournalEntry.element_id = taskGR.sys_id;
                    newJournalEntry.element = 'comments';
                    newJournalEntry.value = incidentJournalGR.value;
                    newJournalEntry.sys_created_by = incidentJournalGR.sys_created_by;
                    newJournalEntry.sys_created_on = incidentJournalGR.sys_created_on;
                    newJournalEntry.update();
                }

                // Move attachments from the incident to the task.
                var taskAttachments = attachment.getAttachments('incident', current.sys_id);
                while (taskAttachments.next()) {
                    attachment.copy('incident', current.sys_id, 'sc_task', taskGR.sys_id);
                }

                // Move emails associated with the incident to the task.
                var emailGR = new GlideRecord('sys_email');
                emailGR.addQuery('instance', current.sys_id);
                emailGR.query();
                while (emailGR.next()) {
                    var newEmailGR = new GlideRecord('sys_email');
                    newEmailGR.initialize();
                    newEmailGR.instance = taskGR.sys_id;
                    newEmailGR.subject = emailGR.subject;
                    newEmailGR.body = emailGR.body;
                    newEmailGR.user_id = emailGR.user_id;
                    newEmailGR.state = emailGR.state;
                    newEmailGR.update();
                }
            }
        }

        // Update the current incident's state to 'Resolved' and provide resolution details.
        current.state = 6; // Resolved state
        current.close_code = 'Converted to request';
        current.u_resolution_category = 'Converted to request';

        // Add information about the conversion to the incident's close notes.
        var newCloseNotes = 'Incident ' + current.number + ' has been converted to Request ' + rc.number + '.';
        current.close_notes = newCloseNotes;

        // Update the incident record in the database.
        current.update();

        // Redirect the user to the newly created request record.
        action.setRedirectURL('/sc_request.do?sys_id=' + rc.sys_id);
    }
})();
