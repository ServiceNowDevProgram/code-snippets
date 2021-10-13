var CustomUtils = Class.create();
CustomUtils.prototype = {
	initialize: function () {},

	/**
	 *
	 * @param {String} sysID: record sys_id
	 * @param {String} tableName: record table name
	 * @returns {glideRecord Obj, boolean}: GlideRecord object of the record OR false
	 */
	_getGlideRecordObject: function (sysID, tableName) {
		if (sysID && tableName) {
			var gr = new GlideRecord(tableName);
			gr.get(sysID);
			if (gr) {
				return gr;
			}
		}

		return false;
    },
    
    // example _getGlideRecordObject
    getIncidentState: function (sysID) {
        var incidentTableName = 'incident';

        var incidentGR = this._getGlideRecordObject(recordSysID, incidentTableName);
        if (incidentGR) {
            return incidentGR.getValue('state');
        }

        return false;
    }

	type: "CustomUtils",
};
