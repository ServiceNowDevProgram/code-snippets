var GetRecordDetails = Class.create();
GetRecordDetails.prototype = {
    initialize: function() {},
    /*
    table - table name of the record.
    record - sysid of the record.
    display_text - Display text of the clickable URL
    urlUI - the URL Type - Accepts workspace/portal and native UI as default.
    uiName - mandatory parameter if urlUI is workspace or portal.

    */
    getClickableURL: function(table, record, display_text, urlUI, uiName) {
        try {
            var grRecord = new GlideRecord(table);
            if (grRecord.get(record)) {
                var instance_url = 'https://' + gs.getProperty('instance_name') + '.service-now.com/';
                var path;

                if (urlUI == 'workspace' && uiName != '') {
                    path = "now/" + uiName + "/record/" + table + "/" + record;
                } else if (urlUI == 'portal' && uiName != '') {
                    path = uiName + "?sys_id=" + record + "&view=sp&id=ticket&table=" + table;
                } else {
                    path = "nav_to.do?uri=" + table + ".do?sys_id=" + record;
                }
                // final URL
                var link = instance_url + path;
                var refLink = '<a href="' + link + '" target="_blank">' + display_text + '</a>';
                return refLink;

            } else {
                gs.info('Record does not exist');
                return '';
            }
        } catch (e) {
            gs.info("Exception occured in getClickableURL method: " + e.message);
            return '';
        }
    },
    type: 'GetRecordDetails'
};
