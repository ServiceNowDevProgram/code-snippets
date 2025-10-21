This script will output a User's Capacity and Availability hourly breakdown of a on a daily basis for a given range.
This is normally not easily accessible in the platform as there are only Weekly and Monthly aggregates in the platform (resource_aggregate_weekly and resource_aggregate_monthly).

If there is a Schedule change, the Capacity and Availablility aggregates may be out of sync as well. 
So, this script will show you what the breakdown is based on the current Schedule.

Of course, you need "Resource Management" installed to use this which typically comes as part of the "PPM Standard" plugin.

To use it, call the "getUserCapacity" function. You can run this in the [System Defintion > Scripts - Background] module

- Argument 1 can be a Sys ID or a User ID from the sys_user table
- Argument 2 is the Start Date of the range you care about in YYYY-MM-DD format
- Argument 3 is the End Date of the range you care about in YYYY-MM-DD format

Example calls:

getUserCapacity("ae44946c835cba90cac7a5e0deaad38f", "2025-01-01", "2025-02-28");

OR

getUserCapacity("abel.tuter", "2026-10-01", "2026-10-31");

Example output (left number is Capacity, right number is Availability):

2025-01-01: 6 | 6
2025-01-02: 6 | 6
2025-01-03: 6 | 6
2025-01-04: 0 | 0
2025-01-05: 0 | 0
2025-01-06: 6 | 5
2025-01-07: 6 | 6
2025-01-08: 6 | 6
2025-01-09: 6 | 6
2025-01-10: 6 | 6
2025-01-11: 0 | 0
2025-01-12: 0 | 0
2025-01-13: 6 | 5
2025-01-14: 6 | 6
2025-01-15: 6 | 6
2025-01-16: 6 | 6
2025-01-17: 6 | 6
2025-01-18: 0 | 0
2025-01-19: 0 | 0
2025-01-20: 6 | 5
2025-01-21: 6 | 6
2025-01-22: 6 | 6
2025-01-23: 6 | 6
2025-01-24: 6 | 6
2025-01-25: 0 | 0
2025-01-26: 0 | 0
2025-01-27: 6 | 5
2025-01-28: 6 | 6
2025-01-29: 6 | 6
2025-01-30: 6 | 6
2025-01-31: 6 | 6

Breakdown for Month --- Capacity: 138 --- Availability: 134

2025-02-01: 0 | 0
2025-02-02: 0 | 0
2025-02-03: 6 | 6
2025-02-04: 6 | 6
2025-02-05: 6 | 6
2025-02-06: 6 | 6
2025-02-07: 6 | 6
2025-02-08: 0 | 0
2025-02-09: 0 | 0
2025-02-10: 6 | 6
2025-02-11: 6 | 6
2025-02-12: 6 | 6
2025-02-13: 6 | 6
2025-02-14: 6 | 6
2025-02-15: 0 | 0
2025-02-16: 0 | 0
2025-02-17: 6 | 6
2025-02-18: 6 | 6
2025-02-19: 6 | 6
2025-02-20: 6 | 6
2025-02-21: 6 | 6
2025-02-22: 0 | 0
2025-02-23: 0 | 0
2025-02-24: 6 | 6
2025-02-25: 6 | 6
2025-02-26: 6 | 6
2025-02-27: 6 | 6
2025-02-28: 6 | 6

Breakdown for Month --- Capacity: 120 --- Availability: 120

Total days in range: 59
Total working days in range: 43
Total capacity: 258
Total availability: 254
