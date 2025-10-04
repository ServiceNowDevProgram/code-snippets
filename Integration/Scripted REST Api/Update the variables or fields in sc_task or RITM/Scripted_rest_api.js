/*
http method-PUT
Resource path-/api/x/Update_sc_task
Relative path-/task_update
API- https://xx.service-now.com/api/x/Update_sc_task/task_update
Request body-
{
"sys_id":"",
"mrvsStatus":"",
"Worknotes":"",
"mrvsvariable:""
}
*/

(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
var response = {}; // Initialize the response object to store the outcome of the operation
var requestBody = request.body; // Get the request body from the incoming request
var requestData = requestBody.data; // Extract the data object from the request body

var sys_id = requestData.sys_id; // Getting the sys_id from the request body
var Status = requestData.mrvsStatus; // Getting the status value from the request body
var Worknotes = requestData.Worknotes; // Getting worknotes details from the request body
var mrvs_variable1 = requestData.mrvsvariable; // One of the rows of MRVS having a unique value

// To update the MRVS and fields of Sc_task
var task = new GlideRecord('sc_task'); 
task.addQuery('sys_id', sys_id); // Add a query to find the task by its sys_id
task.query();

if (task.next()) { 
    var mrvs = task.variables.mrvsname; // Get the MRVS variable from the task record
    var mrvsparsed = JSON.parse(mrvs); // Parse the MRVS JSON string into an object

    // Iterate through the parsed MRVS array to find the correct row to update
    for (var i = 0; i < mrvsparsed.length; i++) {
        // Finding the right row to update based on the MRVS variable value
        if (mrvsparsed[i].mrvsvar1 == mrvs_variable1) {
            mrvsparsed[i].mrvs_status_variable = Status; // Update the status variable for the found row
            // break; // Uncomment if you want to exit the loop after updating the first match
        }
    }

    task.work_notes = Worknotes; // Update the task's work notes with the provided details
    task.update(); 
	
    response = 'Sc_task worknotes updated successfully'; // Set the response message indicating success
    return response; 
    }

})(request, response);
