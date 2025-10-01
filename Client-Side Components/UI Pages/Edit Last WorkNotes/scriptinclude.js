var UpdateCommentsworkNotes = Class.create();
UpdateCommentsworkNotes.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getIncLastWorknotes: function() {
        var recordId = this.getParameter('sysparm_id');
        // Check if the record ID is provided and is not null or undefined
        if (!recordId) {
            gs.error("UpdateINCworkNotes.getIncLastWorknotes: No record ID (sysparm_id) provided.");
            return '';
        }

        var grJournal = new GlideRecord("sys_journal_field");
        grJournal.addEncodedQuery("element_id=" + recordId + "^element=comments^ORelement=work_notes");
        grJournal.orderByDesc('sys_created_on');
        grJournal.setLimit(1);
        grJournal.query();

        if (grJournal.next()) {
            return grJournal.getValue('value');
        }

        return '';
    },

    updateCommentsLatest: function() {
        var recordId = this.getParameter('sysparm_id');
        var newComment = this.getParameter('sysparm_newcomment');
        // Validate input parameters
        if (!recordId || !newComment) {
            gs.error("UpdateINCworkNotes.updateCommentsLatest: Missing required parameters (sysparm_id or sysparm_newcomment).");
            return "failure: Missing parameters.";
        }

        // Update the latest journal entry for the incident
        var grJournal = new GlideRecord("sys_journal_field");
        grJournal.addEncodedQuery("element_id=" + recordId + "^element=comments^ORelement=work_notes");
        grJournal.orderByDesc('sys_created_on');
        grJournal.setLimit(1);
        grJournal.query();

        if (grJournal.next()) {
            grJournal.setValue('value', newComment);
            grJournal.update();
        } else {
            // Log if no journal field was found to update
            gs.warn("UpdateINCworkNotes.updateCommentsLatest: No latest journal entry found for record ID: " + recordId);
        }

        var grAudit = new GlideRecord("sys_audit");
        grAudit.addEncodedQuery("documentkey=" + recordId + "^fieldname=comments^ORfieldname=work_notes");
        grAudit.orderByDesc('sys_created_on');
        grAudit.setLimit(1);
        grAudit.query();

        if (grAudit.next()) {
            grAudit.setValue('newvalue', newComment);
            grAudit.setValue('oldvalue', '');
            grAudit.update();
        } else {
            gs.warn("UpdateINCworkNotes.updateCommentsLatest: No latest audit entry found for record ID: " + recordId);
        }

        var grHistorySet = new GlideRecord("sys_history_set");
        grHistorySet.addQuery("id", recordId);
        grHistorySet.setLimit(1);
        grHistorySet.query();

        if (grHistorySet.next()) {
            grHistorySet.deleteRecord();
        }
    },

    type: 'UpdateCommentsworkNotes'
});
