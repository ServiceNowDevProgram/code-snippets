//
// Finds values in fields that are pure sys_id's
//

var table = "cmn_location"; // Table to search in
var field = "name"; // Table field to search in

var grTable = new GlideRecord(table);
grTable.query();
var searchresults = "";
while (grTable.next()) {
    var fieldvalue=grTable.getValue(field);
    if(/^[a-f0-9]{32}$/.test(fieldvalue)) {
        searchresults += fieldvalue + ",";
    }
}
if( searchresults != "" ) {
    gs.info("The following sys-ids were found in the " + table + "." + field + " field:");
    gs.info(searchresults);
} else {
    gs.info("No Sys-ID based values in " + table + "." + field);
}
