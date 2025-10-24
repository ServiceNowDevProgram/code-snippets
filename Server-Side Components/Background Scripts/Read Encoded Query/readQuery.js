// This code get the encoded query in readable format.
// Pass the table name and encoded query in the function API whoch you want to read.

var grQ= new GlideQueryBreadcrumbs().getReadableQuery('table name', 'Pass the encoded query');
gs.info("Readable Query is "+grQ);
