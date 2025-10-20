
var AddtoOG = Class.create();
AddtoOG.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    addToOrderGuide: function() {
        var msgArrNotAdded = []; // array to store not added catalog items.
        var msgArrAdded = []; // array to store added catalog items.
        var msg = '';
        var item = this.getParameter('sysparm_itemList').toString().split(',');
        var order_guide = this.getParameter('sysparm_og');
        var var_set = this.getParameter('sysparm_set');
        for (var i = 0; i < item.length; i++) {
            var itemName = new GlideRecord('sc_cat_item');
            itemName.get(item[i]); // get item name
            var itemBckName = itemName.name.toString().replace(/[^a-zA-Z0-9]/g, "_");
            // check if item is present in order guide
            var checkStatus = new GlideRecord('sc_cat_item_guide_items');
            checkStatus.addQuery('guide', order_guide);
            checkStatus.addQuery('item', item[i]);
            checkStatus.query();
            if (checkStatus.next()) {
                msgArrNotAdded.push(itemName.name);
            } else {
                // Add variable set to all catalog items selected
                var set = new GlideRecord('io_set_item');
                var orderVar = new GlideRecord('item_option_new');
                set.initialize();
                set.variable_set = var_set;
                set.sc_cat_item = item[i];
                set.order = '200'; // set order as per your requirement
                set.insert();

                // Add checkbox variable in order guide for each catalog item
                orderVar.initialize();
                orderVar.setValue('type', 7);
                orderVar.setValue('cat_item', order_guide);
                orderVar.setValue('question_text', itemName.name);
                orderVar.setValue('name', itemBckName);
                orderVar.setValue('order', 1200); // set order as per your requirement
                orderVar.insert();
            }

            // Add rule base to order guide
            var ruleBase = new GlideRecord('sc_cat_item_guide_items');
            ruleBase.initialize();
            ruleBase.setValue('item', item[i]);
            ruleBase.setValue('guide', order_guide);
            ruleBase.setValue('condition', 'IO:' + orderVar.sys_id + '=true^EQ');
            ruleBase.insert();
            msgArrAdded.push(itemName.name);
        }
        if (msgArrNotAdded.length > 0) {
            msg = "Not added item are " + msgArrNotAdded + ' Added Items are ' + msgArrAdded; // array of items which are not added
        } else
            msg = 'Added Items are ' + msgArrAdded; // array of added items
        return msg;
    },
    type: 'AddtoOG'
});
