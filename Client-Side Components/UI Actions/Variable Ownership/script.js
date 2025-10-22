/*
This script should be placed in the UI action on the table sc_req_item form view.
This UI action should be marked as client.
Use viewMtom() function in the Onclick field.
*/

function viewMtom() {

    var url = 'sc_item_option_mtom_list.do?sysparm_query=request_item=' + g_form.getUniqueValue();
    g_navigation.openPopup(url);

}
