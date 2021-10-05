# ClientDateTimeUtils
This Script Include contains useful functions related to date/time calculations that can be called using GlideAjax.
As there is very limited javascript functions related to Date & Time, this will be very useful for client side calculations of date & time.

## Example Script
```javascript
var ga = new GlideAjax('ClientDateTimeUtils');
ga.addParam('sysparm_name', 'getNowDateTimeDiff');
ga.addParam('sysparm_fdt', g_form.getValue('last_date'));
ga.addParam('sysparm_difftype', 'day');
ga.getXMLAnswer(function(response){
	if(parseInt(response)<2){
		alert("Last date cannot be less than 2 days from today");
	}
});
```
