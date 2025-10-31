// Create a GlideRecord object to query the 'sys_attachment' table
var grAttachments = new GlideRecord('sys_attachment');

// Sort the results by 'size_bytes' in descending order to get the largest attachments first
grAttachments.orderByDesc('size_bytes');

// Limit the query to return only the top 10 records
grAttachments.setLimit(10);

// Execute the query
grAttachments.query();

// Log a header message to indicate the start of the output
gs.info('Top 10 largest attachments:');

// Loop through each record returned by the query
while (grAttachments.next()) {
    // Convert the size from bytes to megabytes and round to 2 decimal places
    var sizeMB = (grAttachments.size_bytes / (1024 * 1024)).toFixed(2);

    // Log the file name, size in MB, and the table the attachment belongs to
    gs.info(
        ' - ' + grAttachments.getDisplayValue('file_name') +
        ' | Size: ' + sizeMB + ' MB' +
        ' | Table: ' + grAttachments.getDisplayValue('table_name')
    );
}
