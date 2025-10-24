var ArtifactRank = Class.create();
ArtifactRank.prototype = {
    initialize: function() {
    },
	
	getNextRank: function(field) {
		var gr = new GlideRecord('TABLENAME'); 
		gr.addQuery('state', '!=', 'published'); 
		gr.addNotNullQuery(field); 
		gr.orderByDesc(field); 
		gr.setLimit(1);
		gr.query(); 
		
		if (gr.next()) {
			// Round up to nearest 10
			var nextRank = parseInt(gr.getValue(field)) + 10; 
			return Math.round(nextRank / 10) * 10; 
		} else {
			return 10; 
		}
	},

    type: 'ArtifactRank'
};