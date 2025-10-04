var MatchURLByRegex = Class.create();
MatchURLByRegex.prototype = {
    initialize: function() {},
	
    matchReferer: function() {
        return ((/YOUR_URL_MATCH_STRING/.test(this.getReferer())));
    },
    
	getReferer: function() {
        return GlideTransaction.get().getRequest().getHeader("referer");
    },
    
	type: 'MatchURLByRegex'
};