var memGroups = []; // empty array for getting the group sys'id rin future.
var gr = new GlideRecord("sys_user_grmember");
gr.addQuery("user", gs.getUserID()); //querying grmember table with the logged-in user to get user's groups.
//gs.print("query is "+gr.getEncodedQuery());
gr.query();
while (gr.next()) {
    memGroups.push(gr.group);//pushing the group's sys_id's into the array
}
//gs.print("groups "+memGroups.join(","));

var filter = "assignment_groupIN" + memGroups.join(", ");// creating filter using the groups array

var listURL = "/incident_list.do?sysparm_query=" + encodeURIComponent(filter); //creating the url with the filter to showcase the list of tickets assigned to the groups which the user is a part of.

var bookmark = new GlideRecord("sys_ui_bookmark"); //gliding bookmark table to verify the logged-in user's has already a book mark or not 
bookmark.addQuery("user", gs.getUserID());
bookmark.addQuery("url", listURL);
bookmark.query();
if (!bookmark.next()) { //if not available then we are creating a new bookmark under favorites tab of the logged-in users
    var newBookmark = new GlideRecord("sys_ui_bookmark");
    newBookmark.initialize();
	newBookmark.order
    newBookmark.user = gs.getUserID();
    newBookmark.url = listURL;
    newBookmark.title = "Incidents assigned to my groups";
    newBookmark.pinned = true;
    newBookmark.insert();
}