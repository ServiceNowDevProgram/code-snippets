(function executeRule(current, previous /*null when async*/) {
  if (new GlideImpersonate().isImpersonating()) {
    // Check if the user is impersonating
    if (current.comments.changes() || current.work_notes.changes()) {
      // Check if comments or work notes have changed
      let actualUserName = gs.getImpersonatingUserDisplayName();
      let impersonatedUserName = gs.getUserDisplayName();
      let logMessage = `User Impersonation Activity Detected:
        Timestamp : ${new GlideDateTime()}
        Actual User: ${actualUserName}
        Impersonated User: ${impersonatedUserName}
        Comments added: ${current.comments || "NA"}
        Work Notes added: ${current.work_notes || "NA"}`;
      gs.info(logMessage);
    }
  }
})(current, previous);
