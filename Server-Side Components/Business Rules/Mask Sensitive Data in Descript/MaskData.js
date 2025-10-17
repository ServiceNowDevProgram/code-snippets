(function executeRule(current, previous /*null when async*/) {
    var desc = current.description + "";
    var ccRegex = /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/g;

    if (ccRegex.test(desc)) {
        current.description = desc.replace(ccRegex, "****-****-****-****");
        gs.addInfoMessage("Sensitive data was masked automatically.");
    }
})(current, previous);
