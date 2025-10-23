var recordToLinkUtil = new RecordToHTML("incident", "1c741bd70b2322007518478d83673af3",
"incident: ${number}-${short_description}",true);

//Adding link as html 
 var html =  '<h1>Incident Link is genearted</h1>\n' + recordToLinkUtil.toString();



 var fileName = 'Test File with RecordLink';
 var tableName =  'incident';
 var recordSysId = "a623cdb073a023002728660c4cf6a768";

 // Generate PDF and attach
 var pdfResult = new sn_pdfgeneratorutils.PDFGenerationAPI().convertToPDF(
     html,
     tableName,
     recordSysId,
     fileName,
     ''
 );
