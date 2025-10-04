// Set the following variables with the name of your import set table and the destination table
var importSetTableName = "u_asset_staging"; // Use your staging table name
var destinationTableName = "alm_asset"; // Use your table name

// Create a property with the transform maps sys_id separated by comma
var transformMapIDs = gs.getProperty('transform.map.sys_id');

// Setup data source for attachment
current.name = "Asset Import"; 
current.import_set_table_name = importSetTableName;
current.file_retrieval_method = "Attachment";
current.type = "File";
current.format = "Excel"; // Type of the file
current.header_row = 1;
current.sheet_number = 1; // Number of sheets
current.insert();

// Process excel file
var loader = new GlideImportSetLoader();
var importSetRec = loader.getImportSetGr(current);
var ranload = loader.loadImportSetTable(importSetRec, current);
importSetRec.state = "loaded";
importSetRec.update();

// Transform import set
var transformWorker = new GlideImportSetTransformerWorker(importSetRec.sys_id, transformMapIDs);
transformWorker.setBackground(true);
transformWorker.start();

gs.flushMessages(); // Clear the past messages

// Redirect to the updated/inserted items
var redirectURL = destinationTableName + "_list.do?sysparm_first_row=1&sysparm_query=sys_updated_bySTARTSWITHjavascript%3A+gs.getUserName%28%29%5Esys_created_onONLast+minute%40javascript%3Ags.beginningOfLastMinute%28%29%40javascript%3Ags.endOfLastMinute%28%29%5EORsys_created_onONCurrent+minute%40javascript%3Ags.beginningOfCurrentMinute%28%29%40javascript%3Ags.endOfCurrentMinute%28%29%5ENQsys_updated_bySTARTSWITHjavascript%3A+gs.getUserName%28%29%5Esys_updated_onONLast+minute%40javascript%3Ags.beginningOfLastMinute%28%29%40javascript%3Ags.endOfLastMinute%28%29%5EORsys_updated_onONCurrent+minute%40javascript%3Ags.beginningOfCurrentMinute%28%29%40javascript%3Ags.endOfCurrentMinute%28%29&sysparm_view=amsla";
producer.redirect = redirectURL;

gs.addInfoMessage('The records was sucessfully created!');

// Since we inserted data source already, abort additional insert by record producer
current.setAbortAction(true);
