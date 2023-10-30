//Returns an array of all the fields in the specified GlideRecord.

var queryString = "priority=1^ORpriority=2";
var now_GR = new GlideRecord('incident');
now_GR.addEncodedQuery(queryString);
now_GR.query();
now_GR.next();

var gRU = new GlideRecordUtil();
var fieldList = gRU.getFields(now_GR);
gs.info(fieldList);
