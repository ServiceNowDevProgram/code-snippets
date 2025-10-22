# Record as a Link Utility

The **Record as a Link Utility** is a versatile tool designed to dynamically render records as clickable links in any HTML field. for any table. This utility allows you to choose specific fields to display, making it ideal for use cases such as notifications, generating PDFs, and more.

## Features

- Dynamically render records based on selected table and fields.
- Generate clickable links for seamless navigation.
- Compatible with various use cases like notifications, reports, and document generation.

## Use Cases

- **Notifications**: Display dynamic links to records in notification messages for any record in serviceNow
- **PDF Generation**: Embed clickable record links in generated PDFs.
- **Custom Applications**: Use in any HTML field to enhance interactivity.

## How to Use

Use the utility as used given code and merge it with other html. example attached for reference.


## Example Usage for PDF Generation

```
var recordToLinkUtil = new RecordToHTML("incident", "1c741bd70b2322007518478d83673af3",
"incident: ${number}-${short_description}",true);

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

 ```

