var piiRedaction = Class.create();
piiRedaction.prototype = {
    initialize: function() {},

    redactPii: function(tableName, record, piiData) {

        //store the parameters as variables

        if (tableName != undefined) {
            var table = tableName;
        } else {
            return gs.log('tableName required', 'piiRedaction');
        }

        if (record != undefined) {
            var record = record;
        } else {
            return gs.log('sysId required', 'piiRedaction');
        }

        if (piiData != undefined) {
            var piiData = piiData;
        } else {
            return gs.log('piiData required', 'piiRedaction');
        }


        //variables for use in queries locating the records that need to be deleted

        var grAudit;
        var grJournal;
        var grEmail;
        var grHistory;
        var grVariables;
        var recordNumber;

        //get the record

        var gr = new GlideRecord(table);
        gr.get(record);

        //if the record has a number store it for later use

        if (gr.getValue('number')) {
            recordNumber = gr.getValue('number');
        }

        //locate the Journal records where the element_id matches the sys_id of the record being redacted and the value contains the piiData being redacted

        grJournal = new GlideRecord('sys_journal_field');
        grJournal.addQuery('element_id', record);
        grJournal.addQuery('value', 'CONTAINS', piiData);
        grJournal.query();

        grJournal.deleteMultiple();


        //If removing piiData from a specific field, not a variable, locate the Audit records.  Query for any records where the document key is the sys_id of the record being redacted and the piiData shows in either the new or old value

        grAudit = new GlideRecord('sys_audit');
        grAudit.addEncodedQuery('documentkey=' + record + '^oldvalueLIKE' + piiData + '^ORnewvalueLIKE' + piiData);
        grAudit.query();

        grAudit.deleteMultiple();


        //Locate the History Records.  All history records for the record need to be removed so they can be regenerated when the history set is loaded again

        grHistory = new GlideRecord('sys_history_set');
        grHistory.addQuery('id', record);
        grHistory.query();

        grHistory.deleteMultiple();

        //if deleting piiData from a variable look up all records on the SC Item Option Mtom table where the request_item.number is the number of the RITM being redacted and the variable name matches the variables name passed into the function

        if (recordNumber != undefined) {
            grVariables = new GlideRecord('sc_item_option_mtom');
            grVariables.addEncodedQuery('request_item.numberSTARTSWITH' + recordNumber + '^sc_item_option.value=' + piiData);
            grVariables.query();

            grVariables.deleteMultiple();
        }

        var grActivity = new GlideRecord('sys_activity');
        grActivity.addQuery('document_id', record);
        grActivity.addQuery('payload', 'CONTAINS', piiData);
        grActivity.query();

        grActivity.deleteMultiple();

        //locate the email records associated to the record being redacted where the body contain the piiData
        grEmail = new GlideRecord('sys_email');
        grEmail.addQuery('instance', record);
        grEmail.addQuery('body', 'CONTAINS', piiData);
        grEmail.query();

        grEmail.deleteMultiple();
    },

    piiRedactField: function(table, record, field, piiData) {
        if (table != undefined) {
            var table = table;
        } else {
            return gs.log('Table required', 'piiRedaction');
        }
        if (record != undefined) {
            var record = record;
        } else {
            return gs.log('Record sys_id required', 'piiRedaction');
        }
        if (field != undefined) {
            var field = field;
        } else {
            return gs.log('Field name required', 'piiRedaction');
        }
        if (piiData != undefined) {
            var piiData = piiData;
        } else {
            return gs.log('piiData string required', 'piiRedaction');
        }

        //variables for use in queries locating the records that need to be deleted

        var grAudit;
        var grJournal;
        var grEmail;
        var grHistory;
        var grVariables;
        var recordNumber;

        //get the record

        var gr = new GlideRecord(table);
        gr.get(record);

        //if the record has a number store it for later use

        if (gr.getValue('number')) {
            recordNumber = gr.getValue('number');
        }

        //locate the Journal records where the element_id matches the sys_id of the record being redacted and the value contains the piiData being redacted

        grJournal = new GlideRecord('sys_journal_field');
        grJournal.addQuery('element_id', record);
        grJournal.addQuery('value', 'CONTAINS', piiData);
        grJournal.query();

        grJournal.deleteMultiple();


        //If removing piiData from a specific field, not a variable, locate the Audit records.  Query for any records where the document key is the sys_id of the record being redacted and the piiData shows in either the new or old value

        grAudit = new GlideRecord('sys_audit');
        grAudit.addEncodedQuery('fieldname=' + field + 'documentkey=' + record + '^oldvalueLIKE' + piiData + '^ORnewvalueLIKE' + piiData);
        grAudit.query();

        grAudit.deleteMultiple();


        //Locate the History Records.  All history records for the record need to be removed so they can be regenerated when the history set is loaded again

        grHistory = new GlideRecord('sys_history_set');
        grHistory.addQuery('id', record);
        grHistory.query();

        grHistory.deleteMultiple();

        //if deleting piiData from a variable look up all records on the SC Item Option Mtom table where the request_item.number is the number of the RITM being redacted and the variable name matches the variables name passed into the function

        if (recordNumber != undefined && table == 'sc_req_item') {
            grVariables = new GlideRecord('sc_item_option_mtom');
            grVariables.addEncodedQuery('request_item.numberSTARTSWITH' + recordNumber + '^sc_item_option.value=' + piiData);
            grVariables.query();

            grVariables.deleteMultiple();
        }


        //locate the email records associated to the record being redacted where the body contain the piiData
        grEmail = new GlideRecord('sys_email');
        grEmail.addQuery('instance', record);
        grEmail.addQuery('body', 'CONTAINS', piiData);
        grEmail.query();

        grEmail.deleteMultiple();

        var grActivity = new GlideRecord('sys_activity');
        grActivity.addQuery('document_id', record);
        grActivity.addQuery('payload', 'CONTAINS', piiData);
        grActivity.query();

        grActivity.deleteMultiple();

        if (gr.getValue(field) == piiData) {
            gr.setValue(field, 'NULL');
            gr.update();
        }
    },

    piiRedactRp: function(table, record, piiData) {
        if (table != undefined) {
            var table = table;
        } else {
            return gs.log('Table name required', 'piiRedactRp');
        }

        if (record != undefined) {
            var record = record;
        } else {
            return gs.log('Record sys_id required', 'piiRedactRp');
        }

        if (piiData != undefined) {
            var piiData = piiData;
        } else {
            return gs.log('piiData string required', 'piiRedactRp');
        }

        //variables for use in queries locating the records that need to be deleted

        var grAudit;
        var grJournal;
        var grEmail;
        var grHistory;

        //get the record

        var gr = new GlideRecord(table);
        gr.get(record);

        //if the record has a number store it for later use

        if (gr.getValue('number')) {
            recordNumber = gr.getValue('number');
        }

        //locate the Journal records where the element_id matches the sys_id of the record being redacted and the value contains the piiData being redacted

        grJournal = new GlideRecord('sys_journal_field');
        grJournal.addQuery('element_id', record);
        grJournal.addQuery('value', 'CONTAINS', piiData);
        grJournal.query();

        grJournal.deleteMultiple();

        //locate the Audit records.  Query for any records where the document key is the sys_id of the record being redacted and the piiData shows in either the new or old value

        grAudit = new GlideRecord('sys_audit');
        grAudit.addEncodedQuery('documentkey=' + record + '^oldvalueLIKE' + piiData + '^ORnewvalueLIKE' + piiData);
        grAudit.query();

        grAudit.deleteMultiple();

        //Locate the History Records.  All history records for the record need to be removed so they can be regenerated when the history set is loaded again

        grHistory = new GlideRecord('sys_history_set');
        grHistory.addQuery('id', record);
        grHistory.query();

        grHistory.deleteMultiple();

        //locate the Question/Answer records for the record producer
        var grQA = new GlideRecord('question_answer');
        grQA.addQuery('table_sys_id', record);
        grQA.addQuery('value', piiData);
        grQA.query();

        grQA.deleteMultiple();

        var grActivity = new GlideRecord('sys_activity');
        grActivity.addQuery('document_id', record);
        grActivity.addQuery('payload', 'CONTAINS', piiData);
        grActivity.query();

        grActivity.deleteMultiple();

        //locate the email records associated to the record being redacted where the body contain the piiData
        grEmail = new GlideRecord('sys_email');
        grEmail.addQuery('instance', record);
        grEmail.addQuery('body', 'CONTAINS', piiData);
        grEmail.query();

        grEmail.deleteMultiple();

    },

    piiRedactQa: function(record, variableName) {

        if (record != undefined) {
            var record = record;
        } else {
            return gs.log('Record sys_id required', 'piiRedactRp');
        }

        if (piiData != undefined) {
            var piiData = piiData;
        } else {
            return gs.log('piiData string required', 'piiRedactRp');
        }

        var gr = new GlideRecord('question_answer');
        gr.addEncodedQuery('table_sys_id=' + record + '^question.name=' + variableName);
        gr.query();

		while(gr.next()) {

		var piiData = gr.getValue('value');	
        
		gr.deleteRecord();
		}
		
        var grActivity = new GlideRecord('sys_activity');
        grActivity.addQuery('document_id', record);
        grActivity.addQuery('payload', 'CONTAINS', piiData);
        grActivity.query();

        grActivity.deleteMultiple();
    },
    type: 'piiRedaction'
};
