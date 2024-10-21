# Update/set field value in bulk
for an instance in an incident table we have 100 records if we want to change the state field from open to work in progress 
This fix script will help in doing this task.
```
var incGr = new GlideRecord('incident');
incGr.addEncodedQuery('state=1'); // incident state is new
incGr.query();
gs.info('incidents Records to update: ' + incGr.getRowCount());
    while (incGr.next()) {
    incGr.request_type = '1';
    incGr.update();
}
```
