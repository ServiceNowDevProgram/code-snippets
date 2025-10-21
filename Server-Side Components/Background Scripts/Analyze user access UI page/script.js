/*
Below background script can be used to analyze if user has access to UI page 
*/

var user = '5381f6fbdb5f4d14567a8e7a4896192e'; // Gets current user ID
var pageId = "manage_access"; // Replace with your actual page ID

var spScriptable = new GlideSPScriptable();
var canAccess = spScriptable.canSeePage(pageId);

gs.print("User " + user + " can access page '" + pageId + "': " + canAccess);
