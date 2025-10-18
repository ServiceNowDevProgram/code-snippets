var DuplicateCIDetector = Class.create();
DuplicateCIDetector.prototype = {
    initialize: function() {},

    findDuplicates: function(ciName, serialNumber, assetTag, sysId) {
        var duplicates = [];
        var gr = new GlideRecord('cmdb_ci');
        gr.addQuery('active', true);

        // Basic name match (case-insensitive)
        if (ciName) {
            gr.addQuery('name', 'LIKE', ciName);
        }

        // Optional matching by serial or asset tag
        if (serialNumber) {
            gr.addOrCondition('serial_number', serialNumber);
        }
        if (assetTag) {
            gr.addOrCondition('asset_tag', assetTag);
        }

        if (sysId)
            gr.addQuery('sys_id', '!=', sysId); // ignore current record

        gr.query();
        while (gr.next()) {
            duplicates.push({
                name: gr.getValue('name'),
                serial_number: gr.getValue('serial_number'),
                asset_tag: gr.getValue('asset_tag'),
                sys_id: gr.getUniqueValue()
            });
        }

        return duplicates;
    },

    type: 'DuplicateCIDetector'
};
