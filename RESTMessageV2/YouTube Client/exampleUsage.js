/**
 * Background Script to interact with YouTube Data API.
 * This script creates an instance of the YouTubeDataClient class, fetches channel info,
 * processes video uploads, and logs relevant information to the system log.
 */

// Create an instance of the YouTubeDataClient class for interacting with YouTube Data API
var ytClient = new YouTubeDataClient();

// Fetch information about your channel using the getMyChannelInfo method
var channelInfo = ytClient.getMyChannelInfo();
// Log the returned channel information to the system log for verification or debugging purposes
gs.info('Channel Info: ' + JSON.stringify(channelInfo, null, 2));

// Process all video uploads on your channel using the processMyUploads method
// This method iterates through all video uploads, either creating or updating records in a ServiceNow table
ytClient.processMyUploads();
// Log a message to the system log indicating that video processing is complete
gs.info('Video processing complete');

// At this point, your ServiceNow instance has data regarding your YouTube channel and its video uploads
// You can query the 'x_snc_artifact_mgr_youtube_video' table to work with this data or utilize it in other scripts
