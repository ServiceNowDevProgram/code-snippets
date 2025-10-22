extractIPAddresses: function(text) {
        var ipRegex = /\b((\d{1,3}\.){3}\d{1,3})\b|\b([a-fA-F0-9:]+:+[a-fA-F0-9:]+)\b/g;
		var matches = text.match(ipRegex);
        return matches;
    },
