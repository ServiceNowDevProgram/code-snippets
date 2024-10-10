var AttachmentSftpUtils = Class.create();
AttachmentSftpUtils.prototype = {
	initialize: function () {
			// Set up the Packages references

		this.File = Packages.java.io.File;
		this.FileOutputStream = Packages.java.io.FileOutputStream;


		//get the parameters

		this.relativeUrl = probe.getParameter("relativeUrl");
		this.domain = probe.getParameter("httpDomain"); 
		this.midlogs = probe.getParameter("MidLogs");
		this.filename = probe.getParameter("filename");
		this.midserverfilepath = probe.getParameter("midserverpath");
		this.midserverfilename = probe.getParameter("filename");
		//this.deleteAfterUpload = probe.getParameter("deleteAfterUpload");
		this.SnowMidUserName = probe.getParameter("SnowMidUsername");
		this.SnowMidPassword = probe.getParameter("SnowMidPassword");

		//sftp

		this.targetServer = probe.getParameter('sftpTargetServer');
		this.targetUsername = probe.getParameter('sftpTargetUsername');
		this.targetPassword = probe.getParameter('sftpTargetPassword');
		this.targetPort = probe.getParameter('sftpTargetPort');
		this.sftpFilePath = probe.getParameter('sftpFilePath');
	},


	sftpFile : function(hostName, userName, password, localFileName, remoteFileName) {
		// Initiate the file transfer from midserver to sftp server
		this.log("Shamma Negi");
		var result = "";
		this.log('sftpFile(): attempting to connect to ' + hostName);
		var ssh = new Packages.com.sshtools.j2ssh.SshClient();
		var ignoreHost = new Packages.com.sshtools.j2ssh.transport.IgnoreHostKeyVerification();
		if (!this.targetPort){
			this.targetPort = 22;
		}
		this.log('sftpFile(): attempting to connect to ' + hostName + " on port " + this.targetPort);
		ssh.connect(hostName, this.targetPort, ignoreHost);

		var pwd = new Packages.com.sshtools.j2ssh.authentication.PasswordAuthenticationClient();
		//var authPassword = new Packages.com.glide.util.Encrypter().decrypt(password);
		//var tarpassword = this.targetPassword;
		pwd.setUsername(userName);
		pwd.setPassword(password);


		this.log('sftpFile(): attempting to copy ' + localFileName + ' to ' + remoteFileName);
		if(ssh.authenticate(pwd) == new Packages.com.sshtools.j2ssh.authentication.AuthenticationProtocolState().COMPLETE) {
			sftp = ssh.openSftpClient();

			try {
				sftp.put(localFileName, remoteFileName);
				this.log("File successfully uploaded to sftp " + remoteFileName);

				result = "File successfully uploaded to sftp";

				if (this.deleteAfterUpload == "true") {
					this.log("deleteAfterUpload -> " + this.deleteAfterUpload + ", deleting local file...");
					new this.File(localFileName)["delete"]();
				}
			} catch(e) {
				this.log('FILE NOT FOUND ' + remoteFileName + ' or error: ' + e);
				result = 'FILE NOT FOUND ' + remoteFileName + ' or error: ' + e;
			}
			sftp.quit();
			try{
				// kill connection
				ssh.disconnect();
			}
			catch(e){
				this.log('Manual connection kill not successful with error: ' + e);
				result = 'Manual connection kill not successful with error: ' + e;
			}
		}
		else {
			result = 'Error ' + new Packages.com.sshtools.j2ssh.authentication.AuthenticationProtocolState().COMPLETE;
		}

		return result;

	},

	log: function(data) {
		if (this.midlogs == "true") {
			ms.log(data);
		}
	},

	type: AttachmentSftpUtils
};
