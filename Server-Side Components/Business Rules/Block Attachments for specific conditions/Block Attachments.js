(function executeRule(current, previous /*null when async*/) {
    gs.addErrorMessage(gs.getMessage("You are not authorized to upload attachments."));
    current.setAbortAction(true);
    return false;

})(current, previous);