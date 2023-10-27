/*
Use Case: Query 'em_event' table to get all event loggged in month with Description as not empty and created in this month to measure thequery execution time post index apply
*/
var executionTime = new GlideStopWatch();
var getEvent = new GlideRecord('em_event'); //query event table 
gr.addEncodedQuery('descriptionISNOTEMPTY^sys_created_onONThis month@javascript:gs.beginningOfThisMonth()@javascript:gs.endOfThisMonth()'); // query event table to get all event created in month and description is not empty
gr.query();
// Add stop watch using 'GlideStopWatch' to measure the execution time to check how quick event table execute the query

gs.info('Execution Time is: ' + executionTime.toString()); 
