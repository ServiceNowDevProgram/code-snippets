(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here
    var recordId = current.sys_id.toString();  
    var empName = current.subject_person;

    var templateId1 = gs.getProperty("sn_hr_core.letter"); // Document Template sysid
   

    var pdfFileName1 = 'Letter:' +empName+ '.pdf'; //letter  name
    

    gs.info('[PDF Generation] HRC Number ' + recordId);

    try {
       
            var docGen1 = new sn_doc.GenerateDocumentAPI();
            docGen1.generateDocumentForTask(recordId, templateId1, pdfFileName1);
         
            gs.info('[PDF Generation] PDF attached to HRC: ' + recordId);
        }
       
        

     catch (ex) {
        gs.error('[PDF Generation] Failed: ' + ex.message);
    }
    current.setWorkflow(false);



})(current, previous);
