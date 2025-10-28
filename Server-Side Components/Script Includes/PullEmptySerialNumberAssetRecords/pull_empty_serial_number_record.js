var getAssetRecord = Class.create();
getAssetRecord.prototype = {
    initialize: function() {},
	
   assetRecord: function() {
        try { 
			var tableName= "alm_asset";
            var result = [];
            var ruleDescription = "Records in Asset with missing Serial Number";

            // GlideRecord query to get all assets with missing Serial Number
            var grAsset = new GlideRecordSecure(tableName);
            grAsset.addEncodedQuery('serial_numberEMPTY'); // Checking for missing serial numbers
            grAsset.query();

            var count = grAsset.getRowCount(); // Count of records with missing serial numbers

            // Get the instance URL
            var instanceUrl = gs.getProperty('glide.servlet.uri'); // Get the instance's base URL
            var url = instanceUrl + 'alm_asset_list.do?sysparm_query=serial_numberEMPTY'; // Complete URL for assets with missing serial number

            // Create the object with required fields and push to result array
            result.push({
                ruleDescription: ruleDescription,
                count: count,
                tableName: tableName,
                url: url
            });

            // Return the result as a JSON string
            return JSON.stringify(result);
        } catch (e) {
            // Log the error in case something goes wrong
            var message = 'In INHUB_0198 method, failure could be due to ' + e.message;
            return ["Error", message];
        }
    },
    type: 'getAssetRecord'
};
