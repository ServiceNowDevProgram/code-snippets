# Tag incident resolution outliers by z score

## What this solves
Average resolution time hides long-tail outliers. This script calculates mean and standard deviation of resolution minutes and tags incidents whose z score exceeds a threshold, helping teams investigate anomalies.

## Where to use
Run as a Background Script or convert into a Scheduled Job for periodic tagging.

## How it works
- Uses `GlideAggregate` to compute count, mean, and approximate variance
- Calculates z score per resolved incident
- Sets a flag field or work note on outliers above a configurable z threshold

## Configure
- `DAYS`: look-back window
- `Z_THRESHOLD`: default 2.5
- `FLAG_FIELD`: field to set, for example a custom boolean `u_outlier`

## References
- GlideAggregate API  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/GlideAggregate/concept/c_GlideAggregateAPI.html
- GlideRecord API  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/GlideRecord/concept/c_GlideRecordAPI.html
- GlideDateTime API  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/GlideDateTime/concept/c_GlideDateTimeAPI.html
