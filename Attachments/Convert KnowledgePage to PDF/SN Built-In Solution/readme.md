## Convert Knowledge Page HTML to PDF and attach it, using SN built-in PDFGenerationAPI ##

There is a simpler way to generate PDF from a Knowledge article, using the OOTB [PDFGenerationAPI](https://developer.servicenow.com/dev.do#!/reference/api/xanadu/server/sn_pdfgeneratorutils-namespace/PDFGenerationAPIBothAPI#P-PDFGenerationAPI?navFilter=pdf) JS class.

You just need to get the HTML content of the corresponding KB Article, then call the convertToPDF function, using some parameters. An example can be seen below:

```javascript
  var articleSysId = "3020c9b1474321009db4b5b08b9a712d"; // This is an OOTB KB Article sys_id (What are phishing scams and how can I avoid them?)
  var articleGr = new GlideRecord("kb_knowledge");
  if (articleGr.get(articleSysId)) {
  
  	var pdfApi = new sn_pdfgeneratorutils.PDFGenerationAPI();
  	var genPDF = pdfApi.convertToPDF(articleGr.getValue("text"), articleGr.getTableName(), articleGr.getUniqueValue(), articleGr.getValue("short_description"));
  
  	gs.info(JSON.stringify(genPDF));
  }
  else {
  	gs.warn("Knowledge Article is not found based on sys_id: " + articleSysId);
  }
```

