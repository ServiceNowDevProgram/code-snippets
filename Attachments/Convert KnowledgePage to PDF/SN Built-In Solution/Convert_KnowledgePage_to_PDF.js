var articleSysId = /* KB Attachment sys_id */;
var articleGr = new GlideRecord("kb_knowledge");
if (articleGr.get(articleSysId)) {

	var pdfApi = new sn_pdfgeneratorutils.PDFGenerationAPI();
	var genPDF = pdfApi.convertToPDF(articleGr.getValue("text"), articleGr.getTableName(), articleGr.getUniqueValue(), articleGr.getValue("short_description"));

	gs.info(JSON.stringify(genPDF));
}
else {
	gs.warn("Knowledge Article is not found based on sys_id: " + articleSysId);
}
