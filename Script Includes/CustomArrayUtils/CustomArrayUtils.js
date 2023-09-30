var CustomArrayUtils = Class.create();
CustomArrayUtils.prototype = {
    initialize: function() {},
	
    /**SNDOC
    @name arrToJSON
    @description Convert input array to JSON. If the array is a key-value pair like ['name','John','age','30'], the output would be a JSON Object like {"name":"John","age":"30"}. If the array is not a key-value pair like ['John','30'], the output would be a JSON Object like {"John":"John","30":"30"}.
    @param  {Array} [array] - Input array to be converted to JSON.
    @param  {Boolean} [isPair] - Boolean indicating if the array is a key-value pair.
    @returns {String} JSON string representation of the input array.
    @throws {Exception} Throws an exception if there's an error during conversion.
    @example 
        var arrayObj = ['name','John','age','30']; 
        var outputObj = new CustomArrayUtils().arrToJSON(arrayObj, true);
        gs.info(outputObj);
        //output: '{"name":"John","age":"30"}'
    */
    arrToJSON: function(array /*Input array */ , isPair /*boolean*/ ) {
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

    /**SNDOC
	 @name mergeArray
	 @description Compare two arrays of objects, provide add/remove/edit based on the difference of the two arrays
	 @param  {Object} [originalArray] - Array of objects is the base of comparison
	 @param  {Object} [modifiedArray] - Array of objects compared against original to determin add/remove/edit
	 @param  {String} [uniqueProperty] - Which object property to coalesce typically sys_id
	 @param  {String} [compareProperty] - Which object property to compare
	 @returns {Object} Array of objects with included 'action' property indicating add/remove/edit
      @example 
        // Comparing two arrays of objects
        var original = [{sys_id: '1', name: 'John'}, {sys_id: '2', name: 'Jane'}];
        var modified = [{sys_id: '1', name: 'Johnny'}, {sys_id: '3', name: 'Jake'}];
        var outputObj = new CustomArrayUtils().mergeArray(original, modified, 'sys_id', 'name');
        gs.info(outputObj);
        // Returns: 
        // [
        //    {sys_id: '1', name: 'Johnny', action: 'edit'},
        //    {sys_id: '2', name: 'Jane', action: 'delete'},
        //    {sys_id: '3', name: 'Jake', action: 'insert'}
        // ]
	*/
	mergeArray: function(originalArray,modifiedArray,uniqueProperty,compareProperty){
		var grouped = [originalArray, modifiedArray].reduce(function(acc, arr, i) {
			var label = i === 0 ? 'orig' : 'mod';
			for (var j = 0; j < arr.length; j++) {
				var curr = arr[j], id = curr[uniqueProperty];
				acc[id] = acc[id] || {orig: null, mod: null };
				acc[id][label] = curr;
			}
			return acc;
		}, {});

		var res = [];

		function insertObj(o, act) {
			var newObj = { action: act };
			// iterate existing keys to add to new object
			for (var k in o) {
				if (o.hasOwnProperty(k)) {
					newObj[k] = o[k];
				}
			}
			res.push(newObj);
		}

		for (var key in grouped) {
			var action, obj;
			if (grouped.hasOwnProperty(key)) { 
				obj = grouped[key];
				if (!obj.orig) {
					insertObj(obj.mod, 'insert');
				} else if (!obj.mod) {
					insertObj(obj.orig, 'delete');
				} else if (obj.mod[compareProperty] !== obj.orig[compareProperty] ){
					insertObj(obj.mod, 'edit');
				}
			}
		}

		return res;
	},

    type: 'CustomArrayUtils'
};
