// Here Im using current as a variable, if you are using this ito business rule then change this variable
var current=new GlideRecord('incident'); // channge your table name
current.get('sys_id'); //change the sys_id

var grAttachment = new GlideRecord("sys_attachment");
    grAttachment.addQuery("table_sys_id", current.sys_id);
    grAttachment.addEncodedQuery("file_nameLIKEtxt");
    grAttachment.query();
    if (grAttachment.next()) {
          var gsa = GlideSysAttachmentInputStream(grAttachment.sys_id.toString());
        var baos = new Packages.java.io.ByteArrayOutputStream();
        gsa.writeTo(baos);
        baos.close();
         var content = baos + ' ';
         //the break lines were missing so I added this
        for (var i = 0; i < content.length; i++) {
             var match = /\r|\n/.exec(content[i]);
            if (match) {
                content = content.replace(content[i], '<br>');
            }
         }
         var html = '<p>' + content + '</p>';
         var pdf = new sn_pdfgeneratorutils.PDFGenerationAPI();
         var newObj = new Object();
        newObj["FooterText"] = "0001/2022 - v1 de 02-02-2022";
        newObj["PageSize"] = "A4";
        newObj["GeneratePageNumber"] = "true";
        newObj["FooterTextAlignment"] = "BOTTOM_LEFT";
         var result = pdf.convertToPDFWithHeaderFooter(html, "incident", current.sys_id, "Test", newObj); //test is a filename
}
