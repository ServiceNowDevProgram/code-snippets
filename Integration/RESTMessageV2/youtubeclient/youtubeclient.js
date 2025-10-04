var YouTubeDataClient = Class.create();
YouTubeDataClient.prototype = {
    initialize: function() {
		this.channelId = 'YESWAI'; 
		this.apiKey    = 'NOWAI'; 
		this.endpoint  = 'https://www.googleapis.com/youtube/v3'; 
    },
	
	getMyChannelInfo: function() {
		gs.debug('getMyChannelInfo()'); 
		var rm = new sn_ws.RESTMessageV2();
		rm.setHttpMethod('GET');
		rm.setEndpoint(this.endpoint + '/channels'); 
		rm.setQueryParameter('part', 'contentDetails'); 
		rm.setQueryParameter('id', this.channelId); 
		
		this._prepareRequest(rm); 
		
		var response = rm.execute(); 
		var body = response.getBody(); 

		gs.debug('body -> ' + body); 
		
		return JSON.parse(body); 
	},
	
	processMyUploads: function() {
		var channelInfo = this.getMyChannelInfo(); 
		var uploadPlaylistId = channelInfo.items[0].contentDetails.relatedPlaylists.uploads; 
		var nextPageToken = 'INIT'; 
		
		var response, items; 
		while (nextPageToken == 'INIT' || nextPageToken != '') {
			gs.debug('Next page token: ' + nextPageToken); 
			
			if (nextPageToken == 'INIT') {
				response = this._getMyUploads(uploadPlaylistId); 
			} else {
				response = this._getMyUploads(uploadPlaylistId, nextPageToken); 
			}
			
			nextPageToken = response.nextPageToken || ''; 
			items = response.items;
			this._processVideoItems(items); 
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
			video.update(); 
		}
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
		
		// gs.debug('body -> ' + body); 
		
		return JSON.parse(body); 
	},
	
	_prepareRequest: function(rm) {
		rm.setQueryParameter('key', this.apiKey); 
	}, 

    type: 'YouTubeDataClient'
};