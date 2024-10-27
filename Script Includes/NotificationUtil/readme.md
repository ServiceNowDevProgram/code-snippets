# NotificationUtil

Quickly format all MRVS variables into a table of your current record into a notification mail scripts by using the NotificationUtil script include.

## Usage

Mail script
```javascript
(function runMailScript(/* GlideRecord */ current, /* TemplatePrinter */ template,
          /* Optional EmailOutbound */ email, /* Optional GlideRecord */ email_action,
          /* Optional GlideRecord */ event) {
              template.print(new notificationUtil().formatMRVS(current))
})(current, template, email, email_action, event);
```