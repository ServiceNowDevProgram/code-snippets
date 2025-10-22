  getXMLContentFromAttachment: function(attachmentTableName,tableSysId) {
        var gsa = new GlideSysAttachment();

        var bytesInFile = gsa.getBytes(attachmentTableName, tableSysId); // Sysid of the data source

        var originalContentsInFile = Packages.java.lang.String(bytesInFile); // originalContentsInFile

        originalContentsInFile = String(originalContentsInFile);

        var helper = new XMLHelper(originalContentsInFile);
        var obj = helper.toObject();

        return obj;

    }
