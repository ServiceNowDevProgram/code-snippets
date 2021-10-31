var CustomUtils = Class.create();
CustomUtils.prototype = {
	initialize: function () {},

	/**
	 *
	 * @param {String} tableName: Table name
	 * @param {String} query: query to filter the records
	 * @param {String} fieldName: Field name for which display value is required
	 * @returns {String OR boolean}: comma separated field display values of filtered records
	 * 								OR false if no record/no display value if found on filtered records
	 */
	_getFieldDisplayValues: function (tableName, query, fieldName) {
		var result = false;
		if (tableName && query && fieldName) {
			var arr = [];
			var gr = new GlideRecord(tableName);
			gr.addEncodedQuery(query);
			gr.query();
			while (gr.next()) {
				if (!gr[fieldName].nil()) {
					arr.push(gr[fieldName].getDisplayValue());
				}
			}
			result = arr.join(", ");
		}

		return result;
	},

	/****** Example functions *******/

	/**
	 *
	 * @param {String} sysIDs: Comma separated list of sysIDs (can also be single sysID)
	 */
	getUserEmailAddressesBySysIDs: function (sysIDs) {
		return this._getFieldDisplayValues("sys_user", "sys_idIN" + sysIDs, "email");
	},

	/**
	 *
	 * @param {String} sysIDs: Comma separated list of sysIDs (can also be single sysID)
	 */
	getUserNamesBySysIDs: function (sysIDs) {
		return this._getFieldDisplayValues("sys_user", "sys_idIN" + sysIDs, "name");
	},

	type: "CustomUtils",
};
