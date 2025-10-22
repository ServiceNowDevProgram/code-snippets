There are many implementations where there is a need to redact PII data from servicenow tables as par of audit requirements.
e.g Instances may have catalog item for the newly onboarded users to order hardware equirement.
This catalog item will contain variable to store shipping information of users which is PII data.
Audit will not want other users to see this PII data.

I have created a script include which redacts PII data from variables, audit log, audit history, emails based on different paramters.

Example Usage:

Below sample code redacts PII data from requested item variables which contain PII Data.

```ruby
 var sc = new GlideRecord('sc_item_option_mtom');
    sc.addQuery('request_item', '<SYSID_OF_RITM>');
    sc.query();
    while (sc.next()) {

        var r = new piiRedaction().redactPii('sc_req_item','<SYSID_OF_RITM>',sc.sc_item_option.value);

    }

```
