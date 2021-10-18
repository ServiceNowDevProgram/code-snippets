
// Find duplicate records in a table e.g. cmdb_ci_vmware_instance based on a field e.g. name

var TABLE_TO_FIND_DUPLICATE_IN = "cmdb_ci_vmware_instance"; // Replace with your table
var FIELD_TO_GROUP_BY = "name"; // replace with your field

var dupRecords = []; 
var gaDupCheck1 = new GlideAggregate(TABLE_TO_FIND_DUPLICATE_IN); 
gaDupCheck1.addAggregate('COUNT', FIELD_TO_GROUP_BY); 
gaDupCheck1.groupBy(FIELD_TO_GROUP_BY); 
gaDupCheck1.addHaving('COUNT', '>', 1); 
gaDupCheck1.query(); 

while (gaDupCheck1.next()) { 
   dupRecords.push(gaDupCheck1.name.toString() + '\n'); 
} 

gs.print(dupRecords);



