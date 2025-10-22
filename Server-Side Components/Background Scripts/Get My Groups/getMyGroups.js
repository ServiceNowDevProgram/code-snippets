// Get current user's group
var currentUserGroups = gs.getUser().getMyGroups();

// Check that the collection object type is JavaObject or not
if (Object.prototype.toString.call(currentUserGroups).match(/^\[object\s(.*)\]$/)[1] == "JavaObject") {
    // ArrayUtil can be used to create a JS Array from Java collection object
    var arrayUtil = new global.ArrayUtil();
    currentUserGroups = arrayUtil.convertArray(currentUserGroups);
}

gs.info(currentUserGroups);
gs.info('Object type: ' + Object.prototype.toString.call(currentUserGroups));
