var someDateTime = new GlideDateTime('2023-10-11 15:30:00');
var formattedDate = someDateTime.getDisplayValueInternal(); // Get date in default format
var customFormattedDate = someDateTime.getDisplayValue('MM/dd/yyyy');

gs.info('Formatted Date: ' + formattedDate);
gs.info('Custom Formatted Date: ' + customFormattedDate);
