# Fix script to update varialbes write roles

- we use variables in catalog items for that we have to provide roles who can access the variable
- we tend to forget adding roles after creating many varialbes
- To update multiple variables write role this fix script will help to add them.


```
function updateItemOptionRoles() {
     var query = 'sys_scope=5f414691db10a4101b2733f3b9961961';   // sys_id of application
     var varGr = new GlideRecord('item_option_new');  // GlideRecord of variables table
     varGr.addEncodedQuery(query);
     varGr.query();
     gs.info('Starting update for ' + varGr.getRowCount() + ' records.'); 
     varGr.setValue('write_roles', 'role1, role2, role3'); // add the write roles 
     varGr.updateMultiple();
    gs.info('Updated ' + varGr.getRowCount() + ' records.');
 }
```
