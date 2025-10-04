//A script include to retrieve Connection and Credentials Information using Connection Alias (sys_id) in a Scoped Application
(function () {

    var provider = new sn_cc.ConnectionInfoProvider();
    var connectionInfo = provider.getConnectionInfo("<sys_id of sys_alias record");
    if (!gs.nil(connectionInfo)) {
        // get Connection Record Information (for ex: connection_url)
        gs.info("Connection URL: " + connectionInfo.getAttribute("connection_url")); // to get other information, replace the connection_url with other field_name available in connection table.

        // get Credential Record Information (for ex: password)
        gs.info("Password: "+ connectionInfo.getCredentialAttribute("password")); // to get other information, replace password with other field_name available in credenitals table.
    }
})();
