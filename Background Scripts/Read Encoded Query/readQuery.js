// This code get the encoded query in readable format.
// Copy and paste encoded query in quotes of the function API whoch you want to read.

var grQ= new GlideQueryBreadcrumbs().getReadableQuery('');
gs.info("Readable Query is "+grQ);
