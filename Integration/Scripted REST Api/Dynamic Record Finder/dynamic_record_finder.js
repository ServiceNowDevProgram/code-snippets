(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

var table = request.queryParams.table || 'incident';
var fieldsParam = request.queryParams.fields || 'number,short_description,priority';
fieldsParam = fieldsParam.toString();
var query = request.queryParams.query || '';
var limit = parseInt(request.queryParams.limit || 50);
var fields = fieldsParam.split(',');
var gr = new GlideRecord(table);
if(query)
 gr.addEncodedQuery(query);
 var data =[];
 gr.setLimit(limit);
 gr.query();
 while(gr.next() ){
  var record={};
  fields.forEach(function(f){
	if(gr.isValidField(f.trim())){
		record[f.trim()] = gr.getValue(f.trim());
	}

  });
  data.push(record);
}
response.setStatus(200);
response.setHeader('Content-Type', 'application/json');

var responseBody ={
	table: table,
	fields: fields,
	status: data
};
response.setBody((responseBody));

})(request, response);
