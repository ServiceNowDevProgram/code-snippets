var PerformanceAnalyticsUtils = Class.create();
PerformanceAnalyticsUtils.prototype = {
	
    initialize: function() {
    },

	/**SNDOC
		@name getCmdbClassTableNames
		@description Retrieve an array of all the child classes from a start class
		
		@param {string} [startClassTableName]
		
		@returns {array} An array of all child classes from the start class downwards
	*/
	
	getCmdbClassTableNames: function(startClassTableName) {
		
		var dbObjectIds = [];
		
		// From the start table sys_class_path, get the child tables
		
		var grDbObjectStart = new GlideRecord('sys_db_object');
		if (grDbObjectStart.get('name', startClassTableName)) {
			
			var grDbObjectChild = new GlideRecord('sys_db_object');
			grDbObjectChild.addQuery('sys_class_path', 'CONTAINS', grDbObjectStart.getValue('sys_class_path'));
			grDbObjectChild.query();
		
			// Put all the child table sys_id's into the returned array
			while (grDbObjectChild.next()) {
				dbObjectIds.push(grDbObjectChild.getUniqueValue());
			}
			
		}
		
		return dbObjectIds;
		
	},	
    type: 'PerformanceAnalyticsUtils'
};