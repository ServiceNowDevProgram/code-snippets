This code snippet will help to inactivate the table records after 90 days of creation through schedule insert on sys trigger table  .
Can be used in BR/Script Inculde/Background script.
### Formatted for background script, please check the result in sys_ trigger Table or else click on document id it will redirect to  inserted JOb 


### Sample Output :
==============

Operation	Table	Row Count
insert	sys_trigger	1  

*** Script: Below runscript scheduled on sys trigger at 2023-01-23 13:29:48

var gr = new GlideAggregate('incident');
gr.addQuery('sys_id', '91cce5c52fb6111015d2e33df699b6f9');
gr.query();
if (gr.next()) {
gr.active = false;
gr.update();
}
