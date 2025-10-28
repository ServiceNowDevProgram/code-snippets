Approval API to Approve / Reject the Approval Record 

* Approve API

Request :
HTTP Method / URI
POST https://<instance name>.service-now.com/api/sr_approvals/<approval record sysid>/approve
  
Headers :
Acceptapplication/json
Content-Typeapplication/json
  
Request Body : 
{
'comment' : 'Please approve this record'
}
  
Response :
Status code : 200 OK 
  
 Response Body
{
  "result": "Record has been Approved!"
}
  
* Reject API
  
Request :
HTTP Method / URI
POST https://<instance name>.service-now.com/api/sr_approvals/<approval record sysid>/reject
  
Headers : 
Acceptapplication/json
Content-Typeapplication/json
  
Request Body : 
{
'comment' : 'Please reject this record'
}
  
Response :
Status code : 200 OK 
  
 Response Body
{
  "result": "Record has been Rejected!"
}
