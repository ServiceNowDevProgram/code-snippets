//Table: Change Request
// UI action button on the change form that exports all the related incidents into a PDF format.
//ServiceNows PDFGenerationAPI allows you to customize the page size, header, footer, header image, page orientation, and more.

var inc = new GlideRecord('incident'),
    incidentsList = [],
    v = new sn_pdfgeneratorutils.PDFGenerationAPI,
    html = '',
    hfInfo = new Object(),
    result;
inc.addQuery('rfc', current.sys_id);
inc.query();
while (inc.next()) {
    incidentsList.push(inc.number);
    incidentsList.push(inc.getDisplayValue('caller_id')); 
    incidentsList.push(inc.getDisplayValue('category'));
    incidentsList.push(inc.getDisplayValue('subcategory'));
    incidentsList.push(inc.getValue('priority')); 
    incidentsList.push(inc.getValue('short_description')); 
    incidentsList.push(inc.getValue('description')); 
    incidentsList.push(inc.getDisplayValue('assignment_group')); 
}
var json = {    
    incidents: incidentsList.toString()
};

 JSON.stringify(json);
html = '<h1 style="margin: 0in; text-align: center; line-height: 107%; break-after: avoid; font-size: 20pt; font-family: Calibri Light, sans-serif; color: #2e74b5; font-weight: normal;" align="center"><strong><span style="font-size: 16.0pt; line-height: 107%; font-family: Arial Narrow, sans-serif; color: #002060;">Incidents Related to the Change: ' + current.number + ' </span></strong></h1><br>';


html += '<div style="width: 100%"><p><strong><span style="font-size: 11pt; font-family: Arial Arrow; color: #002060;">Incidents List</span><span style="font-size: 2pt; font-family: Palatino; color: #002060;">&nbsp;&nbsp;</span></strong></p></div>';
html += '<table style="table-layout: fixed; width: 100%; border-collapse: collapse;" border="1"><tr style="text-align: center;background-color: #B4C6E7;font-size: 10pt; font-family: Arial Arrow; word-wrap: break-word;"><td><strong>Number</strong></td><td><strong>Caller</strong></td><td><strong>Category</strong></td><td><strong>Sub Category</strong></td><td><strong>Priority</strong></td><td><strong>Short Description</strong></td><td><strong>Description</strong></td><td><strong>Assignment Group</strong></td></tr>' + getIncidentsTable(json.incidents) + '</table>';
hfInfo["FooterTextAlignment"] = "BOTTOM_CENTER";
hfInfo["FooterText"] = "Incidents List";
hfInfo["PageOrientation"] = "LANDSCAPE";
hfInfo["GeneratePageNumber"] = "true";

result = v.convertToPDFWithHeaderFooter(html, 'change_request', current.sys_id, "Incidents Related to the Change:_" + current.number, hfInfo);
action.setRedirectURL(current);

function getIncidentsTable(incidents) {
    if (incidents == '')
        return '';
    var table = '',
        i;
    incidents = incidents.split(',');
    for (i = 0; i < incidents.length; i += 8)
        table += '<tr style="text-align: center;font-size: 10pt; font-family: Arial Arrow; word-wrap: break-word;"><td>' + incidents[i] + '</td><td>' + incidents[i + 1] + '</td><td>' + incidents[i +2] + '</td><td>' + incidents[i + 3] + '</td><td>' + incidents[i + 4] + '</td><td>' + incidents[i + 5] + '</td><td>' + incidents[i + 6] + '</td><td>' + incidents[i + 7] + '</td></tr>';
    return table;
}
