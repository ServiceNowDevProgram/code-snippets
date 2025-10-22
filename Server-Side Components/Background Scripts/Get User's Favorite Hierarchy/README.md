This script will allow you to get Favorites Hierarchy of a specific user.
This means all nested groups and links.

Here is an example call with print out. You can replace gs.getUserID() with a User Name instead:

var favorites = getFavoritesHierarchyArray(gs.getUserID());
gs.info(JSON.stringify(favorites));


This will return an array of objects.
Each item in the array will have a "type" property which will be "group" for nested groups and "bookmark" for bookmarks/links

Other properties are named the same as the standard fields on the "sys_ui_bookmark_group" and "sys_ui_bookmark" tables for Groups and Bookmark types respectively
