Purpose: 

Allow bulk task_ci record inserts via a custom rest API endpoint. This will allow integration apps to insert task_ci relationships en masse on task records without needing to make an inordinate number of task_ci table API calls. Additionally, we can provide logic and filtering capabilities beyond the table API to make sure the right CI is associated to the task.

Endpoint:

https://<<<YOUR_INSTANCE_NAME>>>.service-now.com/api/gmi/related_live_ci_to_task

Payload Details:

User posts a JSON object with the task number and an array of CIs to associate to that task. Methods to identify the CIs being inserted can be sys_id, serial, FQDN, name, and IP, with that order of preference. Typically, we will only expect 1 identifier per CI line. fields in the post body:

Task: Task number that we should associate the CIs to. Required field, fail and return error code if this is not populated.

Post Body Example. Note that this is to illustrate the multiple ways users can identify CIs.


{
  "task": "INC123",
  "query_string": "status=1",
  "cis": [
    {
      "name": "p3acme1"
    },
    {
      "serial": "123"
    },
    {
      "sys_id": "abc123"
    },
    {
      "ip": "123.0.0.1"
    },
    {
      "FQDN": "p2acme.secureserver.net"
    }
  ]
}
