// Extracts IPv4 and IPv6 addresses from arbitrary text content
// For single-value validation, use validateIPInput.js or Validate IPv6 Address/script.js
extractIPAddresses: function(text) {
        var ipv4 = "(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)){3}";
        var ipv6 = "("+
            "(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}|"+
            "(?:[A-Fa-f0-9]{1,4}:){1,7}:|"+
            "(?:[A-Fa-f0-9]{1,4}:){1,6}:[A-Fa-f0-9]{1,4}|"+
            "(?:[A-Fa-f0-9]{1,4}:){1,5}(?::[A-Fa-f0-9]{1,4}){1,2}|"+
            "(?:[A-Fa-f0-9]{1,4}:){1,4}(?::[A-Fa-f0-9]{1,4}){1,3}|"+
            "(?:[A-Fa-f0-9]{1,4}:){1,3}(?::[A-Fa-f0-9]{1,4}){1,4}|"+
            "(?:[A-Fa-f0-9]{1,4}:){1,2}(?::[A-Fa-f0-9]{1,4}){1,5}|"+
            "[A-Fa-f0-9]{1,4}:(?:(?::[A-Fa-f0-9]{1,4}){1,6})|"+
            ":(?:(?::[A-Fa-f0-9]{1,4}){1,7}|:)|"+
            "fe80:(?::[A-Fa-f0-9]{0,4}){0,4}%[0-9A-Za-z]{1,}|"+
            "::(?:ffff(?::0{1,4}){0,1}:){0,1}(?:"+
                "(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)){3}"+
            ")|"+
            "(?:[A-Fa-f0-9]{1,4}:){1,4}:(?:"+
                "(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)){3}"+
            ")"+
        ")";
        var ipRegex = new RegExp("\\b(?:" + ipv4 + "|" + ipv6 + ")\\b","g");
        var matches = text.match(ipRegex);
        return matches;
    },
