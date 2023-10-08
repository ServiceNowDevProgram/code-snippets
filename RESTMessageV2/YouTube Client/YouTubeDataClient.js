var YouTubeDataClient = Class.create();
YouTubeDataClient.prototype = {
    initialize: function() {
        this.channelId = 'YOUR_CHANNEL_ID';  // Set the channel ID for later API requests
        this.apiKey    = 'YOUR_API_KEY';  // Set the API key for authenticating requests
        this.endpoint = 'https://www.googleapis.com/youtube/v3';  // Set the base endpoint for YouTube Data API
    },
    
    getMyChannelInfo: function() {
        gs.debug('getMyChannelInfo()'); 
        var rm = new sn_ws.RESTMessageV2();
        rm.setHttpMethod('GET');
        rm.setEndpoint(this.endpoint + '/channels'); 
        rm.setQueryParameter('part', 'contentDetails,statistics,snippet'); 
        rm.setQueryParameter('id', this.channelId);  // Specify the channel ID for the request
        
		this._prepareRequest(rm);  // Prepare the request with additional parameters

        var response = rm.execute();  // Execute the REST request
        // Handle non-successful responses
        if (response.getStatusCode() != 200) {
            gs.error('Error: ' + response.getErrorMessage());
            return null;
        }
        var body = response.getBody(); 

        gs.debug('body -> ' + body); 
        
        return JSON.parse(body);  // Parse and return the JSON response
    },
    
	processMyUploads: function() {
		var channelInfo = this.getMyChannelInfo();  // Get channel information
        var uploadPlaylistId = channelInfo.items[0].contentDetails.relatedPlaylists.uploads;  // Retrieve the uploads playlist ID
        var nextPageToken = 'INIT';  // Initialize the page token for paginated requests

        var response, items;
        // Loop through paginated responses
		while (nextPageToken == 'INIT' || nextPageToken != '') {
			gs.debug('Next page token: ' + nextPageToken); 
			
	    	// Handle the first and subsequent paginated requests differently
			if (nextPageToken == 'INIT') {
				response = this._getMyUploads(uploadPlaylistId); 
			} else {
				response = this._getMyUploads(uploadPlaylistId, nextPageToken); 
			}
			
            // Ensure the response object is valid before proceeding
			if (response) {
				nextPageToken = response.nextPageToken || ''; 
				items = response.items;
				this._processVideoItems(items);
			} else {
				gs.error('Failed to retrieve playlist items. Terminating process.');
				break;
			}
		}
	},
	
		
    
    _processVideoItems: function(items) {
        var self = this; 
        items.forEach(function(item) {
            self._createOrUpdateVideoRecordFromItem(item); 
        });
    }, 
    
    _createOrUpdateVideoRecordFromItem: function(item) {
        var videoId = item.snippet.resourceId.videoId;
        var video = new GlideRecord('x_snc_artifact_mgr_youtube_video'); 
        video.addQuery('video_id', videoId); 
        video.query();
        
        var stats = this.getVideoStatistics(videoId);
        var url = 'https://www.youtube.com/watch?v=' + videoId;

        if (!video.next()) {
            gs.debug('Video does not exist, creating a new record');
            video.initialize();
            video.id = item.id;
            video.video_id = videoId;
            video.title = item.snippet.title;
            video.description = item.snippet.description;
            video.url = url;
            video.published_at = new GlideDateTime(item.snippet.publishedAt.replace('T', ' '));
            video.channel_id = item.snippet.channelId;
            if (stats && stats.items && stats.items[0]) {
                video.view_count = stats.items[0].statistics.viewCount;
                video.like_count = stats.items[0].statistics.likeCount;
                // ... other statistics
            }
            video.insert();
        } else {
            gs.debug('Video exists, updating it');
            video.id = item.id;
            video.video_id = videoId;
            video.title = item.snippet.title;
            video.description = item.snippet.description;
            video.url = url;
            video.published_at = new GlideDateTime(item.snippet.publishedAt.replace('T', ' '));
            video.channel_id = item.snippet.channelId;
            if (stats && stats.items && stats.items[0]) {
                video.view_count = stats.items[0].statistics.viewCount;
                video.like_count = stats.items[0].statistics.likeCount;
                // ... other statistics
            }
            video.update();
        }
    },
    
	getVideoStatistics: function(videoId) {
        var rm = new sn_ws.RESTMessageV2();
        rm.setHttpMethod('GET');
        rm.setEndpoint(this.endpoint + '/videos');
        rm.setQueryParameter('part', 'statistics');  // Specify the part of video data required
        rm.setQueryParameter('id', videoId);  // Specify the video ID for the request

        this._prepareRequest(rm);  // Prepare the request with additional parameters

        var response = rm.execute();  // Execute the REST request
        // Handle non-successful responses
        if (response.getStatusCode() != 200) {
            gs.error('Error: ' + response.getErrorMessage());
            return null;
        }
        var body = response.getBody();
        
        return JSON.parse(body);  // Parse and return the JSON response
    },
    
    _getMyUploads: function(uploadPlaylistId, nextPageToken) {
		gs.debug('getMyUploads()'); 
		
		gs.debug('Upload Playlist ID: ' + uploadPlaylistId); 
		
		var rm = new sn_ws.RESTMessageV2();
		rm.setHttpMethod('GET');
		rm.setEndpoint(this.endpoint + '/playlistItems'); 
		rm.setQueryParameter('part', 'id,snippet,contentDetails,status'); 
		rm.setQueryParameter('playlistId', uploadPlaylistId); 
		
		if (nextPageToken) {
			rm.setQueryParameter('pageToken', nextPageToken); 
		}
		
		this._prepareRequest(rm); 
		
		var response = rm.execute(); 
		var body = response.getBody(); 
		
		// Check if the response was successful before attempting to parse the body
		if (response.getStatusCode() == 200) {
			return JSON.parse(body);
		} else {
			gs.error('Error: ' + response.getStatusCode() + ' - ' + body);
			return null;
		}
	},
    
	_prepareRequest: function(rm) {
        rm.setQueryParameter('key', this.apiKey);  // Include the API key in the request for authentication
    },

    type: 'YouTubeDataClient'
};
