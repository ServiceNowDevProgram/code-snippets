# Auto-fill form from base64encoded data

This widget automatically populates a form on service portal using base64-encoded JSON passed via a URL parameter. Use the variable name as key or for surveys use the sys_id of the [asmt_assessment_instance_question]

## How to

1. Create a new widget and add the server script and client controller from the *Survey or form filler widget.js* file
2. Add the widget for example as a catalog item variable or add it anywhere on your survey taking page such as *take_survey*
3. Encode json of form fields and values key-value pairs and add it as a parameter called data into your url
4. Navigate to page and form autofills

## To note
For catalog items the variable name is the key, for surveys the key to use is the sys_id of the [asmt_assessment_instance_question]


## Example usage

```javascript
var obj = {
	is_this_a_replacement_for_a_lost_or_broken_iphone: "yes",
	what_was_the_original_phone_number: "1234567980",
	monthly_data_allowance: "Unlimited",
	color: "red",
	storage: "256",
}

gs.info(GlideStringUtil.base64Encode(JSON.stringify(obj)))
/*
*** Script: eyJpc190aGlzX2FfcmVwbGFjZW1lbnRfZm9yX2FfbG9zdF9vcl9icm9rZW5faXBob25lIjoieWVzIiwid2hhdF93YXNfdGhlX29yaWdpbmFsX3Bob25lX251bWJlciI6IjEyMzQ1Njc5ODAiLCJtb250aGx5X2RhdGFfYWxsb3dhbmNlIjoiVW5saW1pdGVkIiwiY29sb3IiOiJyZWQiLCJzdG9yYWdlIjoiMjU2In0=
-->
https://{instancename}.service-now.com/esc?id=sc_cat_item&sys_id=ec80c13297968d1021983d1e6253af32&data=eyJpc190aGlzX2FfcmVwbGFjZW1lbnRfZm9yX2FfbG9zdF9vcl9icm9rZW5faXBob25lIjoieWVzIiwid2hhdF93YXNfdGhlX29yaWdpbmFsX3Bob25lX251bWJlciI6IjEyMzQ1Njc5ODAiLCJtb250aGx5X2RhdGFfYWxsb3dhbmNlIjoiVW5saW1pdGVkIiwiY29sb3IiOiJyZWQiLCJzdG9yYWdlIjoiMjU2In0%3D
*/
var arr = {
	"b3bf8ec283683210557ff0d6feaad327": 1,
	"bbbf8ec283683210557ff0d6feaad326": 2,
	"b7bf8ec283683210557ff0d6feaad327": 3,
	"bfbf8ec283683210557ff0d6feaad326": 4,
	"fbbf8ec283683210557ff0d6feaad325": "it is good"
}
gs.print(GlideStringUtil.base64Encode(JSON.stringify(arr)))
/*
*** Script: eyJiM2JmOGVjMjgzNjgzMjEwNTU3ZmYwZDZmZWFhZDMyNyI6MSwiYmJiZjhlYzI4MzY4MzIxMDU1N2ZmMGQ2ZmVhYWQzMjYiOjIsImI3YmY4ZWMyODM2ODMyMTA1NTdmZjBkNmZlYWFkMzI3IjozLCJiZmJmOGVjMjgzNjgzMjEwNTU3ZmYwZDZmZWFhZDMyNiI6NCwiZmJiZjhlYzI4MzY4MzIxMDU1N2ZmMGQ2ZmVhYWQzMjUiOiJpdCBpcyBnb29kIn0=
-->
https://{instancename}.service-now.com/esc?id=take_survey&type_id=cf6e97d35d371200964f58e4abb23f18&data=eyJiM2JmOGVjMjgzNjgzMjEwNTU3ZmYwZDZmZWFhZDMyNyI6MSwiYmJiZjhlYzI4MzY4MzIxMDU1N2ZmMGQ2ZmVhYWQzMjYiOjIsImI3YmY4ZWMyODM2ODMyMTA1NTdmZjBkNmZlYWFkMzI3IjozLCJiZmJmOGVjMjgzNjgzMjEwNTU3ZmYwZDZmZWFhZDMyNiI6NCwiZmJiZjhlYzI4MzY4MzIxMDU1N2ZmMGQ2ZmVhYWQzMjUiOiJpdCBpcyBnb29kIn0%3D
*/
```
