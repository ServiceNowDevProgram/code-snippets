// 1. Add record to update set, Query for the record - get sys id
var rec = new GlideRecord('x_sms_request');
rec.get('4012cbc3830d1210887ced70deaad389');
// 2. Push the record into the current update set  
var um = new GlideUpdateManager2();
um.saveRecord(rec);
