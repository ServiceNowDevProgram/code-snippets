var filter = "active=true^assignment_groupDYNAMICd6435e965f510100a9ad2572f2b47744";// using dynamic filter we are filtering the assignments groups of the logged-in user

var listURL = "/incident_list.do?sysparm_query=" + encodeURIComponent(filter); //creating the url with the filter to showcase the list of tickets assigned to the groups which the user is a part of.

var bookmark = new GlideRecord("sys_ui_bookmark"); //gliding bookmark table to verify the logged-in user's has already a book mark or not 
bookmark.addQuery("user", gs.getUserID());
bookmark.addQuery("url", listURL);
bookmark.query();
if (!bookmark.next()) { //if not available then we are creating a new bookmark under favorites tab of the logged-in users
    var newBookmark = new GlideRecord("sys_ui_bookmark");
	newBookmark.initialize();
	newBookmark.order=9;
	newBookmark.icon="list";
	newBookmark.user = gs.getUserID();
	newBookmark.url = listURL;
	newBookmark.title = "Incidents assigned to my groups";
    	newBookmark.pinned = true;
    	newBookmark.insert();
}
