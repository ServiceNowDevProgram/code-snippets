# Enforce CI maintenance window on Change schedule

## What this solves
Change requests are sometimes scheduled outside the maintenance windows of the affected CIs, causing risky or blocked implementations. This rule validates the planned start and end times of a Change against the maintenance schedules of its related CIs and blocks the update if none of the CIs allow that window.

## Where to use
- Table: `change_request`
- When: before insert and before update
- Order: early (for example 50)

## How it works
- Looks up CIs related to the Change via `task_ci`
- For each CI with a defined `maintenance_schedule` (reference to `cmn_schedule`), uses `GlideSchedule.isInSchedule` to verify the planned start and end are inside the window
- If at least one CI’s maintenance schedule permits the window, the Change is allowed
- If no related CI permits the window, the rule aborts the action with a clear message
- Behaviour for CIs without a defined maintenance schedule is configurable

## Configure
At the top of the script:
- `BLOCK_WHEN_NO_SCHEDULE`: if true, treat CIs without a maintenance schedule as non-compliant
- `REQUIRE_BOTH_BOUNDARIES`: if true, both planned start and planned end must be inside a permitted window
- `TIMEZONE`: optional IANA time zone string (for example `Europe/London`); leave blank to use the schedule or instance default

## Notes
- If your process requires all CIs to permit the window, change `anyPass` logic to `allPass`
- This rule checks only maintenance windows defined on the CI record. If you store schedules at the Business Service level, adapt the CI lookup accordingly

## References
- GlideSchedule API  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/GlideSchedule/concept/c_GlideScheduleAPI.html
- GlideDateTime API  
  https://www.servicenow.com/docs/bundle/zurich-api-reference/page/app-store/dev_portal/API_reference/GlideDateTime/concept/c_GlideDateTimeAPI.html
- Change Management fields  
  https://www.servicenow.com/docs/bundle/zurich-it-service-management/page/product/change-management/concept/change-management-overview.html
- Task CI relationship (`task_ci`)  
  https://www.servicenow.com/docs/bundle/zurich-servicenow-platform/page/product/configuration-management/reference/task-ci.html
