var StripHTML = function(htmlStr, keepLinebreaks) {
    //GlideSPScriptable will not preserve linebreaks
	if (!keepLinebreaks) return GlideSPScriptable().stripHTML(htmlStr);
	else {
        //so unfortunately we have to use regex to keep linebreaks
		var strippedStr = htmlStr.replace(/<br\s*\/?>/gi, "\n");
		strippedStr = strippedStr.replace(/<\/p>/gi, "\n");
		strippedStr = strippedStr.replace(/<\/?[^>]+(>|$)/g, "");
		return strippedStr;
	}
};