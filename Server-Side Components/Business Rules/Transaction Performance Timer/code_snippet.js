// This This code_snippet.js script measure execution time of a Business Rules.
var start = new GlideDateTime();
gs.info('Process started at: ' + start);
doSomeLogic();
var end = new GlideDateTime();
var diff = GlideDateTime.subtract(end, start);
gs.info('Execution took: ' + diff.getDisplayValue());
