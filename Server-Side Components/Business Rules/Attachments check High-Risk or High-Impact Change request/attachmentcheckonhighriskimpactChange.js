(function executeRule(current, previous /*null when async*/ ) {

    var minAttachments = 2;

    var isHighImpact = current.impact == '1';
    var isHighRisk = current.risk == '2';

    if (isHighImpact || isHighRisk) {

        var attachment = new GlideRecord('sys_attachment');
        attachment.addQuery('table_sys_id', current.sys_id);
        attachment.query();

        var attachmentCount = attachment.getRowCount();

        if (attachmentCount < minAttachments) {

            gs.addErrorMessage('State Change aborted: High-Impact/High-Risk Changes require at least ' + minAttachments + ' supporting documents (eg: Implementation Plan, Backout Procedure)' + 'attached before moving to the Scheduled/Implementation phase.');
            current.setAbortAction(true);
        }
    }

})(current, previous);
