## Overview
This script converts a UTC date/time field in ServiceNow to the local time of the user that the script runs under using GlideDateTime.
This distinction is important in certain contexts, such as asynchronous business rules, scheduled jobs, or background scripts, where the executing user may differ from the record owner.
It is useful for notifications, reports, dashboards, or any situation where users need localized timestamps that reflect the correct timezone.

## Table and Field Example
Table: incident
Field: opened_at (stored in UTC)

## How It Works
The script queries the incident table for the most recent active incident.
Retrieves the opened_at field (in UTC).
Creates a GlideDateTime object to convert this UTC timestamp into the local time of the executing user.
Logs both the original UTC time and the converted local time.

## Key Notes
Conversion is always based on the timezone of the user executing the script.
In asynchronous operations (background scripts, scheduled jobs, async business rules), this is the system user running the script.

## Reference
https://developer.servicenow.com/dev.do#!/reference/api/zurich/server_legacy/c_GlideDateTimeAPI
