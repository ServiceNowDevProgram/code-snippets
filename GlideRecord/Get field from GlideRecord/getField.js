/**
 * getFields - Returns an array of all the fields in the specified GlideRecord.
 * 
 * Note: If there is a field name that is the same as the table name, the getFields() method does not return the value of the field.
 * 
 * @function
 * @param {GlideRecord} gr - GlideRecord instance positioned to a valid record.
 * @returns {Array} - Field names for the specified GlideRecord.
**/

var queryString = "<Encoded query to filter the record>";
var now_GR = new GlideRecord('<table_name>');
now_GR.addEncodedQuery(queryString);
now_GR.query();
now_GR.next();

var gRU = new GlideRecordUtil();
var fieldList = gRU.getFields(now_GR);
gs.info(fieldList); // Output: Array of field names for the specified GlideRecord.
