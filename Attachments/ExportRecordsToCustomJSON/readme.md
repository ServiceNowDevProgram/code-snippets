********************************************************************************
Script include "GenerateJSONHelper"

function "GenerateJSONForAttachments" 
	- lines 20 -> 44 defines the JSON Object and maps values from the selected record to their desired attributes
	- line 14 gets a gliderecord of the selected records - this will have to be changed to the record type you are attempting to export
	- Once JSON is generated this function calls 
		-createEmail
		-attachFile
		-sendEmail

function "createEmail"
	- creates sys_email entry to attach JSON to
	- returns email id

function "attachFile"
	- Parameters for JSON payload and email sys_id
	- creates JSON as an attachment and attaches it to the existing email

function "sendEmail" 
	- moves the email to send-ready and adds recipients 

********************************************************************************
UI Action "Generate FCAC JSON Via List"

Leverages GenerateJSONHelper, feeds it a list of selected sys_ids and then uses glideAjax to call "GenerateJSONForAttachments"
