var customArrayUtil = Class.create();
customArrayUtil.prototype = {
    initialize: function() {},
	
    arrToJSON: function(array /*Input array */ , isPair /*boolean*/ ) {
        // Convert input array to JSON 
        //e.g. array = ['name','John','age','30']
        //output would be JSON Object like {"name":"John","age":"30"}
        try {
            var jsonObj = {};
            var myJsonString;
            if (isPair) { // isPair should be true if array is key value pair like ['name','John','age','30']
                for (var i = 0; i < array.length; i = i + 2) {
                    jsonObj[array[i]] = array[i + 1] + '';
                }
                myJsonString = JSON.stringify(jsonObj);
                return myJsonString;
            } else { // isPair should be false if array is not a key value pair like ['John','30']
                for (var i = 0; i < array.length; i++) {
                    jsonObj[array[i]] = array[i] + '';
                }
                myJsonString = JSON.stringify(jsonObj);
                return myJsonString;
            }
        } catch (e) {
            gs.info('Exception caught inside  customArrayUtil.arrToJSON: ' + e);
        }
    },
    type: 'customArrayUtil'
};
