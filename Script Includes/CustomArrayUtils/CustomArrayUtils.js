var CustomArrayUtils = Class.create();
CustomArrayUtils.prototype = {
	initialize: function(useES12 = false) {
		if (useES12) {
			this.arrToJSON = this.arrToJSONModern;
			this.mergeArray = this.mergeArrayModern;
			this.groupBy = this.groupByModern;
		}
	},

	// ====================
	// ES5 Functions
	// ====================

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

	/**SNDOC
    @name groupBy
    @description Groups array elements based on a key function.
    @param {Array} array - The array to group.
    @param {Function} keyFunc - The function that produces the key for grouping.
    @returns {Map} A map with grouped elements.

    @example
    var outputObj = new CustomArrayUtils().groupBy(['one', 'two', 'three'], function(word) { return word.length; });
    var arrayFromMap = Array.from(outputObj.entries());
    gs.info(JSON.stringify(arrayFromMap));
    // Returns: Map { 3 => ['one', 'two'], 5 => ['three'] }
    */
	groupBy: function(array, keyFunc) {
		return array.reduce(function(acc, item) {
			var key = keyFunc(item);
			var group = acc.get(key) || [];
			group.push(item);
			acc.set(key, group);
			return acc;
		}, new Map());
	},

	// ====================
	// ECMAScript 2021 (ES12)
	// ====================

	/**SNDOC
    @name arrToJSONModern
    @description Convert input array to JSON. If the array is a key-value pair like ['name','John','age','30'], the output would be a JSON Object like {"name":"John","age":"30"}. If the array is not a key-value pair like ['John','30'], the output would be a JSON Object like {"John":"John","30":"30"}.
    @param  {Array} [array] - Input array to be converted to JSON.
    @param  {Boolean} [isPair] - Boolean indicating if the array is a key-value pair.
    @returns {String} JSON string representation of the input array.
    @throws {Exception} Throws an exception if there's an error during conversion.
    @example 
        let arrayObj = ['name','John','age','30']; 
        let outputObj = new CustomArrayUtils(true).arrToJSON(arrayObj, true);
        gs.info(outputObj);
        //output: '{"name":"John","age":"30"}'
    */
	arrToJSONModern: function(array, isPair) {
		try {
			const jsonObj = {};

			if (isPair) {
				for (let i = 0; i < array.length; i += 2) {
					jsonObj[array[i]] = String(array[i + 1]);
				}
			} else {
				array.forEach(item => {
					jsonObj[item] = String(item);
				});
			}

			return JSON.stringify(jsonObj);
		} catch (e) {
			gs.info('Exception caught inside customArrayUtil.arrToJSON: ' + e);
		}
	},

	/**SNDOC
	 @name mergeArrayModern
	 @description Compare two arrays of objects, provide add/remove/edit based on the difference of the two arrays
	 @note Same as mergeArray just written with ES12!
     @param  {Object} [originalArray] - Array of objects is the base of comparison
	 @param  {Object} [modifiedArray] - Array of objects compared against original to determin add/remove/edit
	 @param  {String} [uniqueProperty] - Which object property to coalesce typically sys_id
	 @param  {String} [compareProperty] - Which object property to compare
	 @returns {Object} Array of objects with included 'action' property indicating add/remove/edit
      @example 
        // Comparing two arrays of objects
        let original = [{sys_id: '1', name: 'John'}, {sys_id: '2', name: 'Jane'}];
        let modified = [{sys_id: '1', name: 'Johnny'}, {sys_id: '3', name: 'Jake'}];
        let outputObj = new CustomArrayUtils(true).mergeArray(original, modified, 'sys_id', 'name');
        gs.info(outputObj);
        // Returns: 
        // [
        //    {sys_id: '1', name: 'Johnny', action: 'edit'},
        //    {sys_id: '2', name: 'Jane', action: 'delete'},
        //    {sys_id: '3', name: 'Jake', action: 'insert'}
        // ]
	*/
	mergeArrayModern: function(originalArray, modifiedArray, uniqueProperty, compareProperty) {
		const grouped = new Map();

		// Process original array
		originalArray.forEach(item => grouped.set(item[uniqueProperty], { orig: item }));

		// Process modified array and determine actions
		return modifiedArray.map(item => {
			const origItem = grouped.get(item[uniqueProperty])?.orig;
			if (!origItem) return { ...item, action: 'insert' };
			if (item[compareProperty] !== origItem[compareProperty]) return { ...item, action: 'edit' };
			return item;
		})
			.concat(
			// Process deletions
			[...grouped.values()]
			.filter(group => !modifiedArray.some(modItem => modItem[uniqueProperty] === group.orig[uniqueProperty]))
			.map(group => ({ ...group.orig, action: 'delete' }))
		);
	},

	/**SNDOC
    @name groupByModern
    @description Groups array elements based on a key function.
    @param {Array} array - The array to group.
    @param {Function} keyFunc - The function that produces the key for grouping.
    @returns {Map} A map with grouped elements.

    @example
    let outputObj = new CustomArrayUtils(true).groupBy(['one', 'two', 'three'], word => word.length);
    let arrayFromMap = Array.from(outputObj.entries());
    gs.info(JSON.stringify(arrayFromMap));
    // Returns: Map { 3 => ['one', 'two'], 5 => ['three'] }
    */
	groupByModern: function(array, keyFunc) {
		return array.reduce((acc, item) => {
			const key = keyFunc(item);
			const group = acc.get(key) || [];
			group.push(item);
			acc.set(key, group);
			return acc;
		}, new Map());
	},

	type: 'CustomArrayUtils'
};
