decryptEncodedResponse: function(encryptedData) {

        var AESCBCPKCPadding = 'AES/CBC/PKCS5Padding';
        var clientSecret = gs.getProperty('decrypt_key');
        var probe = new JavascriptProbe("MID_Server_NAME"); //
        probe.setName("probeName");
        probe.setJavascript("var dt=new Packages.com.DecryptionUTIL.CodeUTIL();dt.decrypt(" + "'" + AESCBCPKCPadding + "'" + ", " + "'" + encryptedData + "'" + ", " + "'" + clientSecret + "'" + ");");
        var id = probe.create();
        while (true) {
            var checkEccRecord = new GlideRecord('ecc_queue');
            checkEccRecord.addEncodedQuery('topic=JavascriptProbe^response_to=' + id);
            checkEccRecord.query();
            if (checkEccRecord.next()) {
                break;
            }
        }
        return this.parseXMLforAESDecryption(id);
    }
