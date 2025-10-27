var GenericEmailUtility = Class.create();
GenericEmailUtility.prototype = {
    initialize: function() {},
  
     // Generate an Outlook (mailto) link with watermark tracking
    get_Outlook_link: function() {
        try {
            const email_payload = JSON.stringify({
                "REQUESTOR_ID": "",
                "TITLE": "",
                "BODY": "",
                "REQUEST_ID": "",
                "TABLE_ID": ""
            });

            var mailtoLink = false;
            const raw_data = this.getParameter("sysparm_email_body") || email_payload;

            if (global.JSUtil.notNil(raw_data)) {
                var email_data = JSON.parse(raw_data);

                const to = this.getEmail(email_data.REQUESTOR_ID);
                const cc = gs.getProperty("instanceEmailAddress"); // instance default CC
                const subject = email_data.TITLE || '';
                const body = email_data.BODY || '';

                const watermark = this.getWatermark(email_data.REQUEST_ID, email_data.TABLE_ID);

                // Construct mailto link
                mailtoLink = 'mailto:' + to + '?cc=' + cc;

                if (subject)
                    mailtoLink += '&subject=' + encodeURIComponent(subject);

                if (body)
                    mailtoLink += '&body=' + encodeURIComponent(body);

                if (watermark)
                    mailtoLink += encodeURIComponent("\n\nRef: " + watermark);
            }

            return mailtoLink;

        } catch (ex) {
            gs.error("Error in get_Outlook_link(): " + ex.message);
            return false;
        }
    },

     // Fetch watermark ID (creates one if missing)
    getWatermark: function(record_id, table_name) {
        var wm = new GlideRecord('sys_watermark');
        wm.addQuery('source_id', record_id);
        wm.orderByDesc('sys_created_on');
        wm.query();

        if (wm.next()) {
            return wm.getValue('number');
        }

        wm.initialize();
        wm.source_id = record_id;
        wm.source_table = table_name;
        wm.insert();

        return wm.getValue('number');
    },

     // Retrieve user’s email address
    getEmail: function(user_id) {
        if (global.JSUtil.notNil(user_id)) {
            var user = new GlideRecordSecure('sys_user');
            if (user.get(user_id))
                return user.email.toString();
        }
        return '';
    },

    type: 'GenericEmailUtility'
};
