(function executeRule(current, previous /*null when async*/) {

   

    // Only run if description has a value
    if (current.description) {
        var desc = current.description.toString();
      

        // Regex patterns for sensitive data
        var ccRegex = /\b\d{13,16}\b/g;                     // 13–16 continuous digits
        var ccSpaced = /\b(\d{4}[- ]?){3}\d{4}\b/g;         // 4-4-4-4 with spaces/dashes
        var ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/g;            // US SSN
        var phoneRegex = /(\+?\d{1,2}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/g; // phone

        var masked = desc;

        // Apply masking with messages
        if (ccRegex.test(desc)) {
            gs.addInfoMessage("Credit card pattern found → masking");
            masked = masked.replace(ccRegex, "****-****-****-****");
        }

        if (ccSpaced.test(desc)) {
            gs.addInfoMessage("Spaced/dashed credit card pattern found → masking");
            masked = masked.replace(ccSpaced, "****-****-****-****");
        }

        if (ssnRegex.test(desc)) {
            gs.addInfoMessage("SSN pattern found → masking");
            masked = masked.replace(ssnRegex, "***-**-****");
        }

        if (phoneRegex.test(desc)) {
            gs.addInfoMessage("Phone number pattern found → masking");
            masked = masked.replace(phoneRegex, "**********");
        }

        // If changes were made, update the description
        if (masked !== desc) {
            current.description = masked;
            gs.addInfoMessage("Final masked description: " + masked);
            gs.log("Masking rule triggered on record: " + current.number, "MaskingRule");
        } else {
            gs.addInfoMessage("No sensitive data detected, nothing masked.");
        }
    }

})(current, previous);
