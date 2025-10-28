/**
 HACKTOBERFEST2022
 Description: Adds the role_delegator role to a user when made the manager of a group.
              Removes the role when removed as manager of a group.
**/ 
//On Change of CUrrent Group Manager
if (current.operation() == "delete") { 
  removeRoleFromCurrentManager();
} else {
  processGroupManagerRole();
}

function removeRoleFromCurrentManager() {
  var role = new GlideRecord("sys_user_role");
  if (!role.get("name","role_delegator")) {
    gs.log("Cannot grant or remove role_delegator role because it does not exist");
    return;
  }

  var gr = newGlideRecord("sys_user_has_role");
  if (!current.manager.nil()) {
    gr.initialize();
    gr.addQuery("user", current.manager);
    gr.addQuery("role", role.sys_id);
    gr.addQuery("granted_by", current.sys_id);
    gr.query();
    if (!gr.hasNext()) {
      gs.log(current.manager.getDisplayValue() + " did not have the role_delegator role for the " + current.name + " group - not removing");
    } else {
      while (gr.next()) {
        gr.deleteRecord();
      }      
    }
  }
}

function processGroupManagerRole(user) {
  var role = new GlideRecord("sys_user_role");
  if (!role.get("name","role_delegator")) {
    gs.log("Cannot grant or remove role_delegator role because it does not exist");
    return;
  }

  // add role to new manager
  var gr = new GlideRecord("sys_user_has_role");
  if (!current.manager.nil()) {
    gr.addQuery("user", current.manager);
    gr.addQuery("role", role.sys_id);
    gr.addQuery("granted_by", current.sys_id);
    gr.query();
    if (gr.next())
      gs.log(current.manager.getDisplayValue() + " already has the role_delegator role for the " + current.name + " group - not adding");
    else {
      gr.initialize();
      gr.user = current.manager;
      gr.role = role.sys_id;
      gr.granted_by = current.sys_id;
      gr.inherited = false;
      gr.insert();
      gs.addInfoMessage(gs.getMessage("role_delegator role granted to") + " " + 
         current.manager.getDisplayValue() + " " + gs.getMessage("in") + " " + current.name + 
         " " + gs.getMessage("group"));
    }
  }

  // remove role from old manager
  if (!previous.manager.nil()) {
    gr.initialize();
    gr.addQuery("user", previous.manager);
    gr.addQuery("role", role.sys_id);
    gr.addQuery("granted_by", current.sys_id);
    gr.query();
    if (!gr.hasNext())
      gs.log(previous.manager.getDisplayValue() + " did not have the role_delegator role for the " + current.name + " group - not removing");
    else {
      while (gr.next())
        gr.deleteRecord();
      gs.addInfoMessage(gs.getMessage("role_delegator role removed from") + " " + 
         previous.manager.getDisplayValue() + " " + gs.getMessage("in") + " " + current.name + 
         " " + gs.getMessage("group"));
    }
  }
}
