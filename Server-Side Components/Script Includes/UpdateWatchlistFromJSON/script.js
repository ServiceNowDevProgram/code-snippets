function updateWatchlistFromJSON(tableName, recordSysId, jsonPayload) {
	// Check for valid 'watch_list' data
    	if (jsonPayload) {
        	gs.error("JSON must not be empty");
        	return;
    	}    
        var data = JSON.parse(jsonPayload);
	// Check if data is array else convert List of string to array
	var newWatchers = Array.isArray(data) ? data : data.split(',');

	// fetch the record by table name and record sys id
    	var gr = new GlideRecord(tableName);
    	if (gr.get(recordSysId)) {
		// get the existing watchlist data
        	var existingWatchlist = gr.watch_list ? gr.watch_list.split(',') : [];
		
		// Add the new watchlist sys ids into exisitng watchlist
        	for (var i = 0; i < newWatchers.length; i++) {
            		var watcher = newWatchers[i];
                	existingWatchlist.push(watcher);
            	}

        }
	// Remove the duplicate by using SET 
	var watcherSet = new Set(existingWatchlist);
	// Update the newlist into watchlist
        gr.watch_list = Array.from(watcherSet).join(',');
        gr.update();

        gs.info("Watchlist updated successfully for Table "+tableName+": " + gr.number);
    } else {
        gs.error("Record not found for Table "+tableName+": " + recordSysId);
    }
}
