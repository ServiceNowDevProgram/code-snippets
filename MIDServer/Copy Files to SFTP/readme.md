This folder contains function to call MID Server Script Include to send file to SFTP via javascript probe. MID Server Script Include file is placed in MID Server Folder under Copy File to SFTP. MID Server Script File under this folder "Copy File to SFTP.js". This script can help you send the file to SFTP Server by passing the below parameters.
Business Rule : Call Javascript Probe to call the below Probe
var jspr = new global.JavascriptProbe(gs.getProperty('midserver.name.vmd')); //This is sending the MID Server Name
		jspr.setName('ShamaProbe77'); //This is name of the topic under ecc_queue Table
		jspr.setJavascript('var vk = new AttachmentSftpUtils(); res = vk.sftpFile();'); //Calling the MID Server function
		jspr.addParameter("httpDomain",gs.getProperty('instance.url')); //Providing the servicenow instance URL
		jspr.addParameter("relativeUrl" ,url);
		jspr.addParameter("SnowMidUsername" , gs.getProperty('snow.username')); //This is MID Server username
		jspr.addParameter("SnowMidPassword" , gs.getProperty('snow.pass')); //This is MID Server password
		jspr.addParameter("filename" , file_name); // This is the name of the file
		jspr.addParameter("midserverpath" , gs.getProperty('mid.server.pd.path')); // This is MID Server Path
		jspr.addParameter("sftpTargetServer" , gs.getProperty('sftp.target.server')); // This is SFTP Target Server IP/URL
		jspr.addParameter("sftpTargetUsername" ,gs.getProperty('sftp.target.server.user')); //This is SFTP username to authenticate to Server
		jspr.addParameter("sftpTargetPassword" ,gs.getProperty('sftp.target.server.pass')); //This is SFTP password to authenticate to Server
			jspr.addParameter("sftpFilePath" ,gs.getProperty('sftp.file.path')); //This is SFTP file path where we need to send/copy the file.
			jspr.addParameter("sftpTargetPort" ,  gs.getProperty('sftp.file.port'));//This is SFTP port which give =s the access to enter in.
			jspr.addParameter("MidLogs" ,  "true");//This is to allow MID Logs to true so that we can see the errors in Logs
			jspr.create();

When you have a MID Server scipt include and you want to call it from your Business Rule. 
You can use Javascript Probe to call that script Include. In my example I had to send some data out from ServiceNow and place it on Server
So I was using this Javasript Probe to call my code written in MID Server Script Include. As soon as I call this JAvascript Probe
It inserts the record in ecc_queue table which tells me whether the request send is successsful or not.
