try {
  var groupSysId = current.sys_id;
  var userSysId = gs.getUserID();

  // Validate input
  if (!groupSysId || !userSysId) {
    throw new Error("Group Sys ID and User Sys ID are required.");
  }

  // Create a new record in the sys_user_grmember table
  var gr = new GlideRecord("sys_user_grmember");
  gr.initialize();
  gr.group = groupSysId;
  gr.user = userSysId;
  var sysId = gr.insert();

  if (sysId) {
    gs.addInfoMessage(
      "User successfully added to the group. Record Sys ID: " + sysId
    );
  } else {
    throw new Error("Failed to add user to the group.");
  }
} catch (error) {
  gs.addErrorMessage("Error adding user to group: " + error.message);
}
