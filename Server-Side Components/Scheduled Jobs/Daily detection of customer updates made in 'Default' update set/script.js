//Script to detect any changes made in 'Default' (or different based on your configuration) update set

//Sys_id value of the selected update set (In this case 'Default')
var DEFAULT_UPDATE_SET_ID = '3f8ee93a45553010c0a05206e0e0f800';

//Query to get list of all updates done in specified update set this day
var grCustomerUpdate = new GlideRecord('sys_update_xml');
grCustomerUpdate.addQuery('update_set', DEFAULT_UPDATE_SET_ID);
grCustomerUpdate.addEncodedQuery('sys_created_onONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()');
grCustomerUpdate.query();

//Go through all customer updates in the query 
while (grCustomerUpdate.next()) {

    //Notify about found customer updates
    //You can inform about detection in different ways, create event, send e-mail (based on your needs)
    gs.warn('[Scheduled Script Execution] - detected changes made in Default update set in: ' + grCustomerUpdate.name);
}
