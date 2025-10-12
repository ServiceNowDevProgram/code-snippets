(function runTransformScript(source, map, log, target /*undefined onStart*/) {
  // Name split
  if (source.u_full_name) {
    var parts = source.u_full_name.trim().split(/\s+/);
    target.first_name = parts[0];
    if (parts.length > 1) {
      target.last_name = parts.slice(1).join(" ");
    }
  }

  // Email normalize
  if (source.u_email) {
    target.email = source.u_email.toString().toLowerCase();
  }

  // Manager mapping
  var managerMap = this.managerMap;
  gs.info("manager map: " + managerMap);
  if (source.u_manager_email && managerMap) {
    var managerEmail = source.u_manager_email.toString().toLowerCase();
    var managerSysId = managerMap[managerEmail];
    gs.info("TM HR User Dump managerSysId: " + managerSysId);

    if (managerSysId) {
      target.manager = managerSysId;
    } else {
      log.warn(
        "Manager email not found: " +
          managerEmail +
          " for user " +
          source.u_full_name
      );
      target.manager = ""; // optional: blank manager instead of error
    }
  }
})(source, map, log, target);
