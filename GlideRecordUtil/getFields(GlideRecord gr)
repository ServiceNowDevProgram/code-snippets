var queryString = "priority=3^ORpriority=4";
var now_GR = new GlideRecord('incident');
now_GR.addEncodedQuery(queryString);
now_GR.query();
now_GR.next();

var gRU = new GlideRecordUtil();
var fieldList = gRU.getFields(now_GR);
gs.info(fieldList);
