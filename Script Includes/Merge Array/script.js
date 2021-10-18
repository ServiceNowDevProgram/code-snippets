	/**SNDOC
	 @name mergeArray
	 @description Compare two arrays of objects, provide add/remove/edit based on the difference of the two arrays
	 @param  {Object} [originalArray] - Array of objects is the base of comparison
	 @param  {Object} [modifiedArray] - Array of objects compared against original to determin add/remove/edit
	 @param  {String} [uniqueProperty] - Which object property to coalesce typically sys_id
	 @param  {String} [compareProperty] - Which object property to compare
	 @returns {Object} Array of objects with included 'action' property indicating add/remove/edit
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
