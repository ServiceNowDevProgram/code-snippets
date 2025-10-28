# Weekly Incident Trend Analysis

## Overview
Compares incident volume week-over-week to track trends and identify anomalies in incident patterns.

## What It Does
- Counts incidents created last week
- Counts incidents created this week
- Calculates the difference (increase/decrease)
- Logs the trend analysis result

## Use Cases
- Monitor incident volume trends
- Identify weeks with unusual spike/drop in incidents
- Track service health over time
- Alert on incident volume anomalies
- Weekly reporting on incident patterns

## Files
- `incident_trend_analyzer.js` - GlideAggregate-based trend analysis

## How to Use

### Option 1: Run as Scheduled Job
1. Go to **System Scheduler > Scheduled Jobs**
2. Create new Scheduled Job
3. Copy code from `incident_trend_analyzer.js`
4. Set to run weekly (e.g., every Monday morning)
5. Check logs for trend results

### Option 2: Run from Background Script
1. Go to **System Diagnostics > Script Background**
2. Copy and execute the code
3. View results in logs

### Example Usage
```javascript
// The script automatically:
// 1. Queries incidents from last week
// 2. Queries incidents from this week
// 3. Compares counts
// 4. Logs: "Incident count increased by X compared to last week."
```

## Output Examples
```
"Incident count increased by 15 compared to last week."
"Incident count decreased by 8 compared to last week."
"No change in incident volume week-over-week."
```

## Key Features
- Uses `GlideAggregate` for efficient counting
- No heavy querying of individual records
- Date range filtering using ServiceNow helper functions
- Week-over-week comparison logic

## Requirements
- ServiceNow instance with Incident table
- Access to run Background Scripts or create Scheduled Jobs
- Read access to incident records

## Performance Notes
- Very efficient - uses aggregation not GlideRecord loops
- Minimal database impact
- Suitable for running on schedule without performance concerns

## Customization
To track other tables (Change, Problem, etc.):
```javascript
// Change 'incident' to your table name
var lastWeekAgg = new GlideAggregate('change_request');
var thisWeekAgg = new GlideAggregate('change_request');
```

To track different time periods:
```javascript
// Use other helper functions:
// gs.beginningOfThisMonth(), gs.endOfThisMonth()
// gs.beginningOfThisYear(), gs.endOfThisYear()
// gs.addMonthsUTC(), gs.addDaysUTC() for custom ranges
```

## Related ServiceNow APIs
- [GlideAggregate](https://docs.servicenow.com/bundle/sandiego-application-development/page/app-store/dev_apps/concept/c_UsingGlideAggregate.html) - Used for efficient counting
- [GlideSystem Date Functions](https://docs.servicenow.com/bundle/sandiego-application-development/page/app-store/dev_apps/concept/c_SystemDateFunctions.html)
