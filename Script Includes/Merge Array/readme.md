	 @name mergeArray
	 @description Compare two arrays of objects, provide add/remove/edit based on the difference of the two arrays
	 @param  {Object} [originalArray] - Array of objects is the base of comparison
	 @param  {Object} [modifiedArray] - Array of objects compared against original to determin add/remove/edit
	 @param  {String} [uniqueProperty] - Which object property to coalesce typically sys_id
	 @param  {String} [compareProperty] - Which object property to compare
	 @returns {Object} Array of objects with included 'action' property indicating add/remove/edit
   
   This is something I wrote when comparing JSON objects from MRVS that were leveraged on a catalog item to maintain CMDB relationships, however, doesn't have to be limited to that.
