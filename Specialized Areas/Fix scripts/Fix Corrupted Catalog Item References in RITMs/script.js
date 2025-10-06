var ritm = new GlideRecord('sc_req_item');
ritm.addNullQuery('cat_item'); // Missing reference
ritm.query();

var count = 0;
while (ritm.next()) {
    var matchedItem = findCatItemByName(ritm.short_description);
    if (matchedItem) {
        ritm.cat_item = matchedItem.sys_id;
        ritm.update();
        count++;
    }
}

function findCatItemByName(name) {
    var item = new GlideRecord('sc_cat_item');
    item.addQuery('name', name);
    item.setLimit(1);
    item.query();
    return item.next() ? item : null;
}

gs.info('Fixed RITMs with missing catalog item: ' + count);
