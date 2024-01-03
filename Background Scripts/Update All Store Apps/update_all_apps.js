var upgradeUtil = Class.create();
upgradeUtil.prototype = {
	initialize: function () {
        this.debug = true;  // Set to true to get more verbose output
        //this.debug = false;  // Set to true to get more verbose output
    },

	///////////////////////////////////////////////////////////////////////////////
	countUpgrades: function () {

        if (this.debug === true) gs.info("BEGIN: countUpgrades()");

		var log = [];

		///////////////////////////////////////////////////////////////////////////
		// In sys_store_app records, compare version to latest_version to see if we can upgrade		
		///////////////////////////////////////////////////////////////////////////
		var appsGr = new GlideRecord('sys_store_app');
		appsGr.orderBy('name');
		appsGr.addQuery('active', true);
		appsGr.query();

		var applicationsToUpgradeArr = []; // Create an empty JSON array
		var upgrades = 0;
		var total = appsGr.getRowCount();
		log.push("\n --> " + total + " apps found on [sys_store_app]");

		while (appsGr.next()) {
			var notes = appsGr.getValue('name');
			var upgrade = 0;
			var upgrade_version = '';
			var versionStr = appsGr.getValue('version');
			var assignedVersionStr = appsGr.getValue('assigned_version');
			var latestVersionStr = appsGr.getValue('latest_version');
			// Check if Latest Version field is populated, break the current loop if so as update cannot be checked
			if (!latestVersionStr) break;
			// Convert the strings to arrays of integers
			var versionArr = versionStr.split('.').map(Number);
			var assignedVersionArr = assignedVersionStr.split('.').map(Number);
			var latestVersionArr = latestVersionStr.split('.').map(Number);

			// Compare the arrays element-wise
			for (var i = 0; i < versionArr.length; i++) {
				if (versionArr[i] > assignedVersionArr[i] && versionArr[i] > latestVersionArr[i]) {
                    if (this.debug === true) log.push("\n --> " + notes + " version is highest value " + versionStr);
					upgrade_version = versionStr;
					upgrade = 1;
					break;
				} else if (assignedVersionArr[i] > versionArr[i] && assignedVersionArr[i] > latestVersionArr[i]) {
                    if (this.debug === true) log.push("\n --> " + notes + " assigned_version is highest value " + assignedVersionStr);
					upgrade_version = assignedVersionStr;
					upgrade = 1;
					break;
				} else if (latestVersionArr[i] > versionArr[i] && latestVersionArr[i] > assignedVersionArr[i]) {
                    if (this.debug === true) log.push("\n --> " + notes + " latest_version is highest value " + latestVersionStr);
					upgrade_version = latestVersionStr;
					upgrade = 1;
					break;
				} else {
					continue; // version values are all the same. no upgrade	
				}
			}

			if (upgrade == 1) { // If upgrade found, add packageDetails to JSON to send to API later
				var packageDetails = {
					notes: notes,
					id: appsGr.getValue('sys_id'),
					requested_version: upgrade_version,
					load_demo_data: true,
					type: "application"

				};
				applicationsToUpgradeArr.push(packageDetails);
				upgrades++;
			}
		}

		log.push("\n --> " + upgrades + " can be upgraded");
		gs.info(log);

        if (this.debug === true) gs.info("END: countUpgrades()");

		//var value1 = 10;
		//var value2 = 20;
		return {
			prop1: applicationsToUpgradeArr,
			prop2: upgrades
		}

	},

////////////////////////////////////////////////////////////////////////////////
	upgradeAllAvailable: function (loginType, loginKey) {

        if (this.debug === true) gs.info("BEGIN: upgradeAllAvailable() ");

		// Check if any inputs are missing
		if (!loginType || !loginKey) {
			gs.info("No inputs were provided. Please provide the required inputs.");
			return;
		}

		var result = this.countUpgrades();

        if (this.debug === true) gs.info("upgradeAllAvailable(): CONTINUE");

		var log = [];


		var applicationsToUpgradeArr = result.prop1;
		var upgrades = result.prop2;

		if (upgrades == "0") {
			log.push("\n --> No apps found to upgrade");
			//gs.info(log);
			//return;
		}


		////////////////////////////////////////////////////////////////////////////////
		// Build the payload 
		////////////////////////////////////////////////////////////////////////////////
		//var dateString = new GlideDateTime();

		notes = "Submitted " + upgrades + " apps to upgrade"; // This will go in the Batch Install Plan Notes

        if (this.debug === true) gs.info(notes);

		// Create a JSON object containing the packages array
		var payload = {
			"name": "upgradeUtil Script on " + new GlideDateTime(),
			"notes": notes,
			"packages": applicationsToUpgradeArr
		};

		////////////////////////////////////////////////////////////////////////////////
		// check login type: username or Connection & Credential Alias
		////////////////////////////////////////////////////////////////////////////////
		var basicUserName = '';
		var basicPassword = '';

		if (loginType === "") {
			log.push("\n ERROR: loginType is blank");
			gs.info(log);
			explainHowToMakeCreds();
			return;
		}

		if (loginType == "alias") {
			if (this.debug === true) log.push("\n\n --> AUTHTYPE: Connection & Credential Alias")
			var aliasId = loginKey;

			// Set basic authentication using a username and password
			// https://developer.servicenow.com/dev.do#!/reference/api/tokyo/server/sn_cc-namespace/connectioninfo-api
			var provider = new sn_cc.ConnectionInfoProvider();
			var connectionInfo = provider.getConnectionInfo(aliasId);
			if (connectionInfo != null) {
				basicUserName = connectionInfo.getCredentialAttribute("user_name");
				basicPassword = connectionInfo.getCredentialAttribute("password");

				if (basicUserName == null) {
					log.push("\n ERROR: Connection Alias username issue");
					gs.info(log);
					explainHowToMakeCreds();
					return;
				}

				if (basicPassword == null) {
					log.push("\n ERROR: Connection Alias password issue");
					gs.info(log);
					explainHowToMakeCreds();
					return;
				}
			} else {
				log.push("\n --> Connection Alias unknown issue - ABORTING!!!");
				gs.info(log);
				explainHowToMakeCreds();
				return false;
			}
		} else {
			log.push("\n\n --> Authentication will be with an account")
			var basicUserName = loginType.toString();
			var basicPassword = loginKey.toString();
			log.push("\n --> User will be => " + basicUserName);
			//log.push("\n --> Key will be => " + basicPassword);
		}

		if (basicUserName == '' || basicPassword == '') {
			log.push("\n --> credentials not found.");
			gs.info(log);
			return;
		}

		////////////////////////////////////////////////////////////////////////////////
		// Call the API
		////////////////////////////////////////////////////////////////////////////////

		// Create a RESTMessageV2 object and set the endpoint URL and HTTP method
		var instanceName = gs.getProperty('instance_name');
		if (instanceName.indexOf("nowlearning") !== -1) { // need to add .lab to URL
			instanceName = instanceName + ".lab";
		}

		var request = new sn_ws.RESTMessageV2();
		request.setEndpoint('https://' + instanceName + '.service-now.com/api/sn_cicd/app/batch/install');
		request.setHttpMethod('POST');

		// Set basic authentication using a username and password
		request.setBasicAuth(basicUserName, basicPassword);

		// Set the request headers to accept JSON
		request.setRequestHeader("Accept", "application/json");

		// Set the request body to the JSON payload
		request.setRequestBody(JSON.stringify(payload));

		// Execute the REST API call and log the response body
		var response = request.execute();
		var responseBody = response.getBody();
		var statusCode = response.getStatusCode();

        switch (statusCode) {
            case 200:
                if (this.debug === true) gs.info("HTTP 200: Auth Successful");
                break;
            case 401:
                gs.info('HTTP 401: Unauthorized');
                gs.info('The credentials you provided did not work.');
                return;
                //break;
            default:
                gs.info("\n\nERROR: Request failed with status code " + statusCode);
                //gs.info(log);
                return;
                //break;
        }

		var responseBodyJSONObj = JSON.parse(responseBody);

		var myObject = responseBodyJSONObj.result.links.results;
		for (var property in myObject) {
			if (myObject.hasOwnProperty(property)) {
				var value = myObject[property];
				if (property == "id") {
					var batchUrl = 'https://' + instanceName + '.service-now.com/nav_to.do?uri=sys_batch_install_plan.do?sys_id=' + value;
					var allBatchPlans = 'https://' + instanceName + '.service-now.com/now/nav/ui/classic/params/target/sys_batch_install_plan_list';

					log.push("\n\n --> This Batch Plan: \n" + batchUrl + "\n");
					log.push("\n\n --> Batch Plan List: \n" + allBatchPlans + "\n");
				}
			}
		}

		gs.info(log);


        if (this.debug === true) gs.info("BEGIN: upgradeAllAvailable() ");

	},

	explainHowToMakeCreds: function(log) {
		var instanceName = gs.getProperty('instance_name');
		var connection_url = 'https://' + instanceName + '.service-now.com/';
		var alias_url = 'https://' + instanceName + '.service-now.com/nav_to.do?uri=sys_alias.do?sys_id=752a91887740001038e286a2681061fb';
		var log = [];
		log.push("\n\n --> NEED TO RECONFIGURE CICD CONNECTION ALIAS FOR SCRIPT");
		log.push("\n\n --> Go to this URL:\n" + alias_url + "\n");
		log.push("\n\n --> Change 'Type' to 'Connection and Credential and Save Record");
		log.push("\n     (Stay on page)");
		log.push("\n\n --> Create NEW Connection");
		log.push("\n     NAME: (enter name)");
		log.push("\n     Credential: (Create new record)");
		log.push("\n     Connection URL: " + connection_url);
		gs.info(log);
	},

	type: 'upgradeUtil'
};

var upgradeUtil = new upgradeUtil();
