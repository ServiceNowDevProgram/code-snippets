deleteDuplicates('table_name', 'criteria1', 'criteria2');

function deleteDuplicates(tableName, field1, field2){

// declare an array
var dupRecords = [];
var duplicateCheck = new GlideAggregate(tableName);
duplicateCheck.addNotNullQuery(field1);
duplicateCheck.addNotNullQuery(field2);
duplicateCheck.groupBy(field1);
duplicateCheck.groupBy(field2);
duplicateCheck.addHaving('COUNT', '>', 1); // addHaving func won't work in scope app
duplicateCheck.query();
while(duplicateCheck.next()) {
var jsonObj = {}; // declare a json object
jsonObj[field1] = duplicateCheck[field1].toString();
jsonObj[field2] = duplicateCheck[field2].toString()
dupRecords.push(jsonObj);
}

var jsonString = JSON.stringify(dupRecords); // convert json object to string

var parser = new JSONParser();
var parsedData = parser.parse(jsonString);
var length = parsedData.length;

for(var i=0; i<length; i++){

var encodedQuery = field1 + '=' + parsedData[i][field1] + '^' + field2 + '=' + parsedData[i][field2];

var tableRec = new GlideRecord(tableName);
tableRec.addEncodedQuery(encodedQuery);
tableRec.query();
if(tableRec.next()){
gs.info('Repeated Data is: User -> ' + tableRec.getDisplayValue('user') + ' Group -> ' + tableRec.getDisplayValue('group'));
tableRec.deleteRecord();
}
}
}
