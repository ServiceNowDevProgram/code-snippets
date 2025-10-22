# Incident priority set on insert only

## What this solves
Recurring imports often overwrite priority even after the service desk has triaged the ticket. This onBefore script sets priority only when a row is inserted. Updates pass through without touching priority.

## Where to use
Attach to your Incident Transform Map as an onBefore script.

## How it works
- Checks the Transform Map action variable for insert vs update
- On insert, computes priority from impact and urgency
- On update, does nothing to priority

## References
- Transform Map scripts  
  https://www.servicenow.com/docs/bundle/zurich-integrate-applications/page/administer/import-sets/task/t_AddOnBeforeScriptToTransformMap.html
- Incident fields and priority logic  
  https://www.servicenow.com/docs/bundle/zurich-it-service-management/page/product/incident-management/concept/incident-fields.html
