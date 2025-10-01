// Convert Knowledge Page HTML to PDF and attach it.
// Create PDF using GeneralPDF.
// Try it from a simple HTML conversion.
// It seems that the conversion fails if the HTML contains image files.
// See the Scriptinclude GeneralPDF for details. 
// GeneralPDF is already in ScriptInclude, but it may not exist in some environments

var grKnow = new GlideRecord('kb_knowledge');
// Get a simple HTML KnowledgePage
if (grKnow.get('<KnowledgePage sys_id>') && grKnow.getValue('text')) {
    // Create PDF Document.
    var pdfDoc = new GeneralPDF.Document(null, null, null, null, null, null);
    var document = new GeneralPDF(pdfDoc);
    document.startHTMLParser();
    document.addHTML(grKnow.getValue('text'));
    document.stopHTMLParser();
    // Create PDF Attachment.
    var att = new GeneralPDF.Attachment();
    att.setTableName(grKnow.getTableName());
    att.setTableId(grKnow.getValue('sys_id'));
    // Attached file name. 
    att.setName('TestPDF.pdf');
    att.setType('application/pdf');
    att.setBody(document.get());
    // Attachment creation
    GeneralPDF.attach(att);
}
