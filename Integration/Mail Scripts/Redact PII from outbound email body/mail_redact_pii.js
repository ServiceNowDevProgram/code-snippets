// Mail Script: Redact PII from outbound email body
// Usage inside a Notification (Advanced view):
//   var safe = redactPii(current.short_description + '\n\n' + current.description);
//   template.print(safe);

(function() {
  function redactPii(text) {
    if (!text) return '';

    // Config: toggle specific redactions
    var cfg = {
      email: true,
      phone: true,
      ip: true,
      niNumber: true,
      card16: true
    };

    var out = String(text);

    // Email addresses
    if (cfg.email) {
      out = out.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[redacted email]');
    }

    // Phone numbers (UK leaning, permissive, 7+ digits ignoring separators)
    if (cfg.phone) {
      out = out.replace(/\b(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{3,5}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}\b/g, '[redacted phone]');
    }

    // IPv4 addresses
    if (cfg.ip) {
      out = out.replace(/\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g, '[redacted ip]');
    }

    // National Insurance number style (AA 00 00 00 A) simplified - UK Specific
    if (cfg.niNumber) {
      out = out.replace(/\b([A-CEGHJ-PR-TW-Z]{2}\s*\d{2}\s*\d{2}\s*\d{2}\s*[A-D])\b/gi, '[redacted ni]');
    }

    // 16 consecutive digits that look like a card (permit separators)
    if (cfg.card16) {
      out = out.replace(/\b(?:\d[ -]?){13,19}\b/g, function(match) {
        var digits = match.replace(/[ -]/g, '');
        return digits.length >= 13 && digits.length <= 19 ? '[redacted card]' : match;
      });
    }

    return out;
  }

  // Expose function to the mail template scope
  this.redactPii = redactPii;
}).call(this);
