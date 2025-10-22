(function execute(inputs, outputs) {
/*
Flow action name: Update Fillable PDF and Add Signature

inputs:signature image, PDF record, target table, target record 

Outputs: 

If successful: Final Attachment Sys_id and Status

If failed: Error Message:PDF doesn't have editable fields.
*/

var Signatureid = inputs.Signature;
var PDFRecord = inputs.PDFRecord;
var TargetTableName = inputs.TargetTableNmae;
var TargetTableId = inputs.TargetTableId;
var result;


//check if PDF is editable/Fillable Fields
var e = new sn_pdfgeneratorutils.PDFGenerationAPI;
var edit = e.isDocumentFillable(PDFRecord);
gs.info(edit.document_editable);

if(edit.document_editable == "true" || edit.document_editable == true){
    //get PDF record tablename and table record

var sourcePDF = new GlideRecord("sys_attachment");
if(sourcePDF.get(PDFRecord)){
var sourcePDFName=sourcePDF.table_name;
var sourcePDFRecord=sourcePDF.table_sys_id;
}

var fieldMap = new Object();
fieldMap["Name"] = "Hemanth";
var paramMap = new Object();
paramMap["FlattenType"] = "partially_flatten";

//add signature to the PDF
var requestor = new sn_pdfgeneratorutils.PdfMergeSignRequestor;
requestor.createRequest(PDFRecord, sourcePDFName, sourcePDFRecord, "filledPdfdone");
requestor.addSignatureMapping(1, 43, 120, 250, 50, Signatureid);  //adjust signature position and size

//add signature to the PDF and attach to tagert record
var v = new sn_pdfgeneratorutils.PDFGenerationAPI;
result = v.fillFieldsAndMergeSignature(fieldMap, PDFRecord, TargetTableName, TargetTableId, requestor, "filledPdfdone", paramMap);

outputs.result =result;
}
else{
    outputs.result ="Can't Eidt this PDF"
}



})(inputs, outputs);
