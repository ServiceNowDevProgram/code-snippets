//Setting up the content of the PDF that will be generated
//It contains - Short Description, Number, Caller ID, Priority, Assignment Group and Description
var content =
    '<div style="font-family: Arial, sans-serif; font-size: 14px; color:#333; padding:8px;">' +
    '<h2 style="color:#0b5cab; font-weight:bold; margin-bottom:10px;">' + current.short_description + '</h2>' +
    '<p><b>Number:</b> ' + current.number + '</p>' +
    '<p><b>Caller:</b> ' + current.getDisplayValue('caller_id') + '</p>' +
    '<p><b>Priority:</b> ' + current.getDisplayValue("priority") + '</p>' +
    '<p><b>Assignment Group:</b> ' + current.getDisplayValue('assignment_group') + '</p>' +
    '<p><b>Description:</b> ' + current.getDisplayValue("description") + '</p>' +
    '</div>';


new sn_pdfgeneratorutils.PDFGenerationAPI().convertToPDF(content, current.sys_class_name, current.sys_id, current.number);
action.setRedirectURL(current);
