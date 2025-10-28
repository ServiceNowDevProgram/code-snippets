var table = ''; // Name of the table, e.g. kb_knowledge_block
var listField = ''; // Name of the list field to remove an element from, e.g. can_read_user_criteria
var whatToRemove = ''; // Sys_id of the element to remove from the list field, e.g. sys_id of user criteria
var encQ = listField + 'LIKE' + whatToRemove; // encoded query to limit queried record to those that contain the element we want to remove
var listArray = []; // initial array variable declaration
var elementIndex = -1; // initial index variable declaration


/* Run a GlideRecord query to find all records that contain the element to be deleted from the specifid list field */
var listGr = new GlideRecord(table);
listGr.addEncodedQuery(encQ);
listGr.query();
while(listGr.next()) {
  listArray = listGr[listField].toString().split(','); // set the array variable based on the List field of the found record
  elementIndex = listArray.indexOf(whatToRemove); // search for the element to remove from this particular record
  /* Only try to remove the element and update the record if it was found, i.e. not -1 */
  if(elementIndex > -1) {
    listArray.splice(elementIndex,1);
    listGr.setValue(listField,listArray);
    listGr.update();
  }
  /* Reset the initial array related variables */
  listArray = [];
  elementIndex = -1;
}
