gr.query();
var outPutQuery = gr.getEncodedQuery();  //this gives query applied above as encoded query
if(!gr.next()){ //check if record exist or not
//create record
gr.initialize();
gr.applyEncodedQuery(outPutQuery); //set field values as “outPutQuery” encoded query
gr.insert();
}
