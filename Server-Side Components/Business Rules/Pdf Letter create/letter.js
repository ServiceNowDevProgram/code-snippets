
(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here
    var recordId = current.sys_id.toString();  
    var empName = current.subject_person;

    var templateId1 = gs.getProperty("sn_hr_core.letter"); // Document Template sysid


    var pdfFileName1 = 'Letter:' +empName+ '.pdf'; //letter  name


    gs.info('[PDF Generation] HRC Number ' + recordId);

    try {

      var attachmentGR = new GlideRecord('sys_attachment');             //if any pdf letter attached
        attachmentGR.addQuery('table_name', 'sn_hr_core_case');
        attachmentGR.addQuery('table_sys_id', recordId);
        attachmentGR.addQuery('file_name', pdfFileName1);
        attachmentGR.query();

        if (!attachmentGR.hasNext()) {               //check for new letter
            var docGen1 = new sn_doc.GenerateDocumentAPI();
            docGen1.generateDocumentForTask(recordId, templateId1, pdfFileName1); // genereate pdf letter

            gs.info('[PDF Generation] PDF attached to HRC: ' + recordId);
        }
    }


     catch (ex) {
        gs.error('[PDF Generation] Failed: ' + ex.message);
    }
    current.setWorkflow(false);
}



})(current, previous);
