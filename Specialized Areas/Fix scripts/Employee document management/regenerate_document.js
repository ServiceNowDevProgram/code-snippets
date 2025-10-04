var gr = new GlideRecord('VALID_TABLE_NAME');
gr.addEncodedQuery('PASS_VALID_QUERY_To_TARGET_RECORDS_WHICH_HAVE_DOCUMENTS_THAT_NEEDS_TO_BE_REGENERATED');
gr.query();
while (gr.next()) {

    if (new hr_PdfUtils().isValidPdfTemplateForPreFill(gr.pdf_template.sys_id)) { //Check if it is a pre-filled type of document or editable pdf document
        var pdfDraftSysId = new hr_PdfUtils().prefillPdfTemplate(gr.pdf_template.sys_id, false, gr.sys_id, gr.sys_class_name, gr.sys_id);
        if (gs.nil(pdfDraftSysId))
            gs.info('Error occurred while generating pdf for ' + gr.sys_id);
    } else {
        new GeneralHRForm().inactivateRelatedDrafts(gr.sys_class_name, gr.sys_id);
        var caseAjax = new hr_CaseAjax();
        var document = caseAjax.documentBody(gr.sys_class_name, gr.sys_id, gr.sys_class_name, gr.sys_id, 'true');
        caseAjax.setDocumentBody(document.body, gr.sys_class_name, gr.sys_id, gr.sys_class_name, gr.sys_id);
    }
}
