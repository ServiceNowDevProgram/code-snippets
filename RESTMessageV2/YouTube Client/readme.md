# YouTube Data Client for ServiceNow

This project provides a structured way to interact with the YouTube Data API within a ServiceNow environment using the traditional REST Message V2. This approach might be an insightful exploration for those accustomed to the newer YouTube Spoke provided by ServiceNow.

## Pre-requisites

### Obtaining a YouTube Data API Key

Before diving in, ensure you have an API key from the Google Cloud Platform for interacting with the YouTube Data API. The steps below guide you through the process:

1. **Visit** the [Google Cloud Console](https://console.cloud.google.com/).
2. **Create** a new project if you don't already have one.
3. **Navigate** to the "Dashboard" then "+ ENABLE APIS AND SERVICES".
4. **Search** for "YouTube Data API v3" and click on it.
5. **Press** "ENABLE" then **Click** on "Create credentials".
   - **API Usage**: Select "YouTube Data API v3".
   - **Data Access**: Select "Public data".

6. **Collect** your new API key and consider restricting it for enhanced security.

### Identifying Your YouTube Channel ID

To tailor the script for your channel, you'll need your YouTube Channel ID:

1. **Sign in** to [YouTube](https://www.youtube.com/).
2. **Access** "Your Channel" from the profile dropdown.
3. **View** your Channel ID in the URL or under "Settings" > "Advanced settings".

## Script Configuration

With your API key and Channel ID in hand, modify the script include to reflect your channel credentials:

```javascript
var YouTubeDataClient = Class.create();
YouTubeDataClient.prototype = {
    initialize: function() {
        this.channelId = 'YOUR_CHANNEL_ID';  // Replace with your YouTube Channel ID
        this.apiKey    = 'YOUR_API_KEY';  // Replace with your YouTube Data API Key
        this.endpoint  = 'https://www.googleapis.com/youtube/v3'; 
    },
    // ... rest of the code
};
```

## Integration Steps in ServiceNow

1. **Log in** to your ServiceNow instance.
2. **Navigate** to "Application Navigator" > "Script Includes".
3. **Create** a new script include, paste your modified script, name it, and provide a description.
4. **Submit** to save your script include.

Your ServiceNow instance is now equipped to interact with the YouTube Data API.

## Usage

1. **Instance Creation**:
   ```javascript
   var ytClient = new YouTubeDataClient();
   ```

2. **Fetching Channel Info**:
   ```javascript
   var channelInfo = ytClient.getMyChannelInfo();
   ```

3. **Processing Uploads**:
   ```javascript
   ytClient.processMyUploads();
   ```

Dive into the script, explore its structure, and feel free to tailor it to your specific needs while gaining a traditional perspective on API interaction within ServiceNow!