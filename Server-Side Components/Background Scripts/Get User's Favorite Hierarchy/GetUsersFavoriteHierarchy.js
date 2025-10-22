// Example call with print out. You can replace gs.getUserID() with a User Name instead
var favorites = getFavoritesHierarchyArray(gs.getUserID());
gs.info(JSON.stringify(favorites));

function getFavoritesHierarchyArray(userId) {
	var hierarchy = [];
	addGroups("NULL", hierarchy, userId);
	addItems("NULL", hierarchy, userId);
	return hierarchy;
}

function addGroups(parentId, array, name) {
  var grBookmarkGroup = new GlideRecord("sys_ui_bookmark_group");
  grBookmarkGroup.addEncodedQuery("user=" + name + "^parent_group=" + parentId);
  grBookmarkGroup.query();
  while (grBookmarkGroup.next()) {
    var groupObj = {
      "type": "group",
      "color": grBookmarkGroup.getValue("color"),
      "order": grBookmarkGroup.getValue("order"),
      "title": grBookmarkGroup.getValue("title"),
      "items": [],
    };
    array.push(groupObj);
    addGroups(grBookmarkGroup.getUniqueValue(), groupObj.items, name);
    addItems(grBookmarkGroup.getUniqueValue(), groupObj.items, name);
  }
}

function addItems(parentGroup, array, name) {
  var grBookmark = new GlideRecord("sys_ui_bookmark");
  grBookmark.addEncodedQuery("user=" + name + "^group=" + parentGroup);
  grBookmark.query();
  while (grBookmark.next()) {
    var grBookmarkObj = {
      "type": "bookmark",
      "color": grBookmark.getValue("color"),
      "order": grBookmark.getValue("order"),
      "icon": grBookmark.getValue("icon"),
      "open_in_form": grBookmark.getValue("open_in_form"),
      "pinned": grBookmark.getValue("pinned"),
      "separator": grBookmark.getValue("separator"),
      "title": grBookmark.getValue("title"),
      "ui_type": grBookmark.getValue("ui_type"),
      "uncancelable": grBookmark.getValue("uncancelable"),
      "url": grBookmark.getValue("url"),
      "flyout": grBookmark.getValue("flyout"),
      "flyout_sizing": grBookmark.getValue("flyout_sizing"),
      "flyout_width": grBookmark.getValue("flyout_width"),
    };
    array.push(grBookmarkObj);
  }
}
