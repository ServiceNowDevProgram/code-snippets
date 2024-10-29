//note : this script is going to mark all the update sets that are in progress to complete so make sure the query meets your requirements.

var gr = new GlideRecord("sys_update_set"); //querying the update sets table to check update sets which are in progress  
gr.addQuery("state","in progress");

gr.setValue("state","complete"); //marking them to complete and updating multiple records using updateMultiple()
gr.updateMultiple();
