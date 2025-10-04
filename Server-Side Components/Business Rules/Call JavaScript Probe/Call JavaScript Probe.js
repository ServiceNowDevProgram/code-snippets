var jspr = new global.JavascriptProbe(gs.getProperty('midserver.name.vmd')); //MID Server name
		jspr.setName('ShammaProbe77');
		jspr.setJavascript('var vk = new AttachmentSftpUtils(); res = vk.sftpFile();'); //here comes the MID Server Script Include class and function name
		jspr.addParameter("httpDomain",gs.getProperty('instance.url')); // ServiceNOW Instance URL
		jspr.addParameter("relativeUrl" ,url);
		jspr.addParameter("SnowMidUsername" , gs.getProperty('snow.username')); //ServiceNow MID Server username
		jspr.addParameter("SnowMidPassword" , gs.getProperty('snow.pass'));//ServiceNow MID Server password
		jspr.addParameter("filename" , file_name); //name of the file which you want to send to SFTP
		jspr.addParameter("midserverpath" , gs.getProperty('mid.server.pd.path'));
		jspr.addParameter("sftpTargetServer" , gs.getProperty('sftp.target.server')); //SFTP SErver IP Address
		jspr.addParameter("sftpTargetUsername" ,gs.getProperty('sftp.target.server.user'));//SFTP Target username 
		jspr.addParameter("sftpTargetPassword" ,gs.getProperty('sftp.target.server.pass')); //SFTP Target Password
			jspr.addParameter("sftpFilePath" ,gs.getProperty('sftp.file.path')); //SFTP File Path
			jspr.addParameter("sftpTargetPort" ,  gs.getProperty('sftp.file.port')); //SFTP Port Number
			jspr.addParameter("MidLogs" ,  "true");
			jspr.create();
