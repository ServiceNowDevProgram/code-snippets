function updateWatchlistFromJSON(tableName, recordSysId, jsonPayload) {
	// Check for valid 'watch_list' key
    	if (jsonPayload) {
        	gs.error("JSON must not be empty");
        	return;
    	}    
        var data = JSON.parse(jsonPayload);
	var newWatchers = Array.isArray(data) ? data : data.split(',');

    	var gr = new GlideRecord(tableName);
    	if (gr.get(recordSysId)) {
        	var existingWatchlist = gr.watch_list ? gr.watch_list.split(',') : [];

        	for (var i = 0; i < newWatchers.length; i++) {
            		var watcher = newWatchers[i];
                	existingWatchlist.push(watcher);
            	}

        }
	var watcherSet = new Set(existingWatchlist);
        gr.watch_list = Array.from(watcherSet).join(',');
        gr.update();

        gs.info("Watchlist updated successfully for Table "+tableName+": " + gr.number);
    } else {
        gs.error("Record not found for Table "+tableName+": " + incidentSysId);
    }
}
