// From Client Script, make Ajax call to Script Include, include parameters (Examples below)
var ajax = new GlideAjax('HM_Task_Details');
ajax.addParam('sysparm_tableName', 'sc_req_item');
ajax.addParam('sysparm_recordID', g_form.getValue('icr_ritm_number'));
ajax.addParam('sysparm_name', 'getDetails');
ajax.getXMLAnswer(setAnswer);

// Define callback function for async
function setAnswer(answer) {

    // Return parsed JSON object for answer
    var obj = JSON.parse(answer);
    
    // Select object property and return its value via dot walking
    if (!obj.short_description) {
        g_form.setValue('icr_short_description', 'N/A');				
    } else {
        g_form.setValue('icr_short_description', obj.short_description);
    }
}

// !!! Script Include being called by client script (via AJAX) needs to return object in order for this to operate as intended !!!
// Reach out to me if you have any questions, DevinValencia@yahoo.com