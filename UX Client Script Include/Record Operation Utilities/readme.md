#Record Operations Utilities which can be in imported in any UIB client script (Make sure to make the client script include accessible in all scopes)
1. createRecord - Function to execute create record data broker with necessary arguments
2. updateRecord - Function to execute update record data broker with necessary arguments
3. deleteRecord - Function to execute delete record data broker with necessary arguments

/*Sample script to show how to import client script include can be included :-
function handler({api, event, helpers, imports}) {
  const { createRecord, updateRecord, deleteRecord } = imports['global.Record Operation Utilities']();
}
*/
