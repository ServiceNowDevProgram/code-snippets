/*
 * Tests whether passed value in parameter `grRecordInstance` represents a valid GlideRecord instance.
 * 
 * @param {Object} grRecordInstance
 *   Reference to an instance of a GlideRecord object.
 * @param {Object} [strTableName]
 *   If specified an additional check of the GlideRecord against the given table name is performed.
 * @returns {Object}
 *   Name of the table for which the GlideRecord was instantiated.
 * @throws TypeError
 *   In case value of parameter `strTableName` is not a string or parameter count is 0. 
 */
function isValidGlideRecord(grRecordInstance, strTableName) {
	
	if (arguments.length === 0) {
		throw new TypeError('At least one parameter value is expected!');
	}
	
	if (arguments.length > 1 && (typeof strTableName !== 'string' || strTableName.length === 0)) {
		throw new TypeError('Value of parameter "strTableName" does not represent a valid string!');		
	}
	
	var _strTableName = String(strTableName || '').trim();
	
	var _isValid = 
		grRecordInstance &&
		typeof grRecordInstance === 'object' &&
		grRecordInstance instanceof GlideRecord &&
		!grRecordInstance.isNewRecord() &&
		grRecordInstance.isValidRecord();
	
	
	if (_strTableName.length > 0) {
		_isValid = _isValid && grRecordInstance.getTableName() === strTableName;
	}

	return _isValid;
};
