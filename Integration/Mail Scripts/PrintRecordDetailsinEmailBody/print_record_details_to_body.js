// Start the HTML container with gray color and Helvetica font
template.print('<div style="color: #808080; font-family: helvetica;">');

// Display the Short Description label in bold and larger font
template.print('<font size="4"><strong>Short Description: </strong></font>');

// Display the actual short description from the current record in a smaller font
template.print('<font size="3">' + gs.getMessage(current.short_description).replace(/(\r\n|\n|\r)/g, '') + '</font>');
template.print('<br />\n');  // Add a line break after the short description

// Display the Description label in bold and larger font
template.print('<font size="4"><strong>' + gs.getMessage('Description') + ':</strong></font>');

// Display the actual description from the current record, preserving line breaks
template.print('<font size="3" style="white-space: pre-line;">' + gs.getMessage(current.description) + '</font>');
template.print('<br />\n');  // Add a line break after the description

// Display the Comments label in bold and larger font
template.print('<font size="4"><strong>' + gs.getMessage('Comments') + ':</strong></font><br />');

// Display the actual comments from the current record in a smaller font
template.print('<font size="3">' + gs.getMessage('${current.comments}') + '</font>');

// Close the HTML container
template.print('</div>');
