# Query records older than N days efficiently

## What this solves
You often need to find records older than a threshold without loading the world into memory. This snippet:
- Uses GlideDateTime maths to compute a date boundary
- Uses encoded queries with index-friendly operators
- Streams results and logs a compact summary

## Where to use
Background Script, Script Include utility, or any server-side context.

## How it works
- Compute a past date with GlideDateTime and subtract days
- Build an encoded query like `opened_at<javascript:gs.daysAgoStart(n)` or a literal date
- Limit fields with `addQuery` and `setLimit` when sampling

## References
- GlideRecord API  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/GlideRecord/concept/c_GlideRecordAPI.html
- GlideDateTime API  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/GlideDateTime/concept/c_GlideDateTimeAPI.html
- GlideSystem date helpers  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/GlideSystem/reference/r_GlideSystem-date-methods.html
