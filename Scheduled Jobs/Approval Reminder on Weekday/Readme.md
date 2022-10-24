Trigger reminder notification Every 3 rd day excluding weekends if the approver not approved.  
Example: if any approval triggered on Monday not approved next three days  then an reminder email will get trigger on Tuesday for approvals.
if approval created on Friday/Saturday/Sunday then  reminder get trigger on Wednesday.
(sat and sunday will not count as we are using Glideschedule of weekdays).
[GlideSchedule](https://developer.servicenow.com/dev.do#!/reference/api/tokyo/server/no-namespace/c_GlideScheduleScopedAPI).
