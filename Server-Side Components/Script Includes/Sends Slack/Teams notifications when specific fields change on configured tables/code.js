/**
* Script Include: AuditFieldChangeNotifier
* Description: Sends Slack/Teams notifications when specific fields change on configured tables.
* Usable in: Business Rule (after update)
*/
var AuditFieldChangeNotifier = Class.create();
AuditFieldChangeNotifier.prototype = {
   initialize: function () {
       // Slack or Teams webhook URL (store in sys_properties for security)
       this.webhookUrl = gs.getProperty('x_custom.audit_notifier.webhook_url', '');
       // Default app name
       this.appName = gs.getProperty('x_custom.audit_notifier.app_name', 'ServiceNow');
   },
   /**
    * Send notification if the specified fields have changed
    * @param {GlideRecord} current - Current record
    * @param {GlideRecord} previous - Previous record
    * @param {Array} fieldsToWatch - Array of field names to monitor
    */
   notifyOnFieldChange: function (current, previous, fieldsToWatch) {
       try {
           if (!this.webhookUrl) {
               gs.warn('[AuditFieldChangeNotifier] Webhook URL not configured.');
               return;
           }
           var changes = [];
           fieldsToWatch.forEach(function (field) {
               if (current[field] + '' !== previous[field] + '') {
                   changes.push({
                       field: field,
                       oldValue: previous[field] + '',
                       newValue: current[field] + ''
                   });
               }
           });
           if (changes.length === 0)
               return; // No relevant field changed
           var payload = this._buildPayload(current, changes);
           this._sendWebhook(payload);
       } catch (e) {
           gs.error('[AuditFieldChangeNotifier] Error: ' + e.message);
       }
   },
   /**
    * Build payload for Slack/Teams message
    */
   _buildPayload: function (current, changes) {
       var shortDesc = current.short_description ? current.short_description + '' : '(No short description)';
       var tableName = current.getTableName();
       var recordUrl = gs.getProperty('glide.servlet.uri') + tableName + '.do?sys_id=' + current.sys_id;
       var changeLines = changes.map(function (c) {
           return `• *${c.field}* changed from _${c.oldValue}_ → *${c.newValue}*`;
       }).join('\n');
       return JSON.stringify({
           text: `🛠️ *${this.appName}* — Field Update Notification\n\n*Record:* <${recordUrl}|${tableName}> \n*Description:* ${shortDesc}\n\n${changeLines}\n\n_Updated by ${gs.getUserDisplayName()}_`
       });
   },
   /**
    * Send payload to webhook
    */
   _sendWebhook: function (payload) {
       var r = new sn_ws.RESTMessageV2();
       r.setEndpoint(this.webhookUrl);
       r.setHttpMethod('POST');
       r.setRequestHeader('Content-Type', 'application/json');
       r.setRequestBody(payload);
       var response = r.execute();
       if (response.getStatusCode() >= 400)
           gs.error('[AuditFieldChangeNotifier] Webhook error: ' + response.getBody());
   },
   type: 'AuditFieldChangeNotifier'
};
