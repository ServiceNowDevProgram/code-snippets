/*
 * Pre sensor: You can change payload before it will be proccesed by Identification Engine.
 * Use IEJsonUtility in order to add relevant information to the payload
 * Input parameters in Pre sensor mode: payload, patternIds
 */


var rtrn = {};

// parsing the json string to a json object
var payloadObj = JSON.parse(payload);

// Clearing payload string to save memory
payload = null;

// Put your business logic here
var handlegrIpRouterdata = function() {

    gs.info('PD: handlegrIpRouter');

    var ipRouterName = '';

    var payloadItems = payloadObj.items;

    for (var i = 0; i < payloadItems.length; i++) {

        if (payloadItems[i].className === 'cmdb_ci_interface_card') { //Get Child class data  

            var currentItem = payloadItems[i];

            ipRouterName = currentItem.values.u_configuration_item;

        

            if (ipRouterName && ipRouterName.length) {

                var grIpRouter = new GlideRecord('cmdb_ci_ip_router');

                if (grIpRouter.get('name', ipRouterName)) { 

                    

                    currentItem.values.u_configuration_item = grIpRouter.sys_id + '';
					currentItem.values.managed_by_group = grIpRouter.managed_by_group + '';

                }

			

            }

        }

    }

};
handlegrIpRouterdata();
// For node logger, please use: prePostNodeLogger.info\warn\error\debug(prePostLogPrefix + '<YOUR_LOG_STATEMENT>')

// You can return a message and a status, on top of the input variables that you MUST return.
// Returning the payload as a Json String is mandatory in case of a pre sensor script, and optional in case of post sensor script.
// If you want to terminate the payload processing due to your business logic - you can set isSuccess to false.
rtrn = {
	'status': {
		'message': 'Enter your message here',
		'isSuccess' :true
	},
	'patternId': patternId,
	'payload': JSON.stringify(payloadObj)
};
