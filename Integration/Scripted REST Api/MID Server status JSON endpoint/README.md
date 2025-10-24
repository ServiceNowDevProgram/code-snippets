# MID Server status JSON endpoint

## What this solves
Operations teams often need a quick machine-readable view of MID Server health for dashboards and monitors. This Scripted REST API returns a compact JSON array of MID Servers with their status, last update time, and a simple "stale" flag if the record has not changed recently.

## Where to use
Create a Scripted REST API with a single Resource and paste this script as the Resource Script. Call it from monitoring tools, dashboards, or widgets.

## How it works
- Queries `ecc_agent` for active MID Servers
- Returns `name`, `status`, `sys_id`, `sys_updated_on`, and a computed `stale` boolean based on a configurable `minutes_stale` query parameter (default 15)
- Uses `gs.dateDiff` to compute minutes since last update

## Configure
- Pass `minutes_stale` as a query parameter to override the default, for example `...?minutes_stale=30`
- Extend the payload as needed (for example add `version`, `ip_address`) if available in your instance

## References
- Scripted REST APIs  
  https://www.servicenow.com/docs/bundle/zurich-application-development/page/build/applications/task/create-scripted-rest-api.html
- MID Server overview  
  https://www.servicenow.com/docs/bundle/zurich-servicenow-platform/page/product/mid-server/concept/c_MIDServer.html
- GlideRecord API  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/GlideRecord/concept/c_GlideRecordAPI.html
- GlideDateTime and dateDiff  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/GlideDateTime/concept/c_GlideDateTimeAPI.html
