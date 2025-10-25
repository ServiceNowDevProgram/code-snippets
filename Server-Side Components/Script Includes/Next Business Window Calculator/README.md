# Next Business Window Calculator

## Problem
You often need to compute the *next business window* for task scheduling, SLAs, or batch processing: “Start at 16:45, add 95 working minutes using schedule X and holiday set Y, and return both the end time and the ‘windows’ you traversed.” Native APIs give you the building blocks, but teams frequently re-invent this logic.

## Where to use it
- Script Include utility callable from Business Rules, Flow/Schedule jobs, or Background Scripts
- Works in *scoped* apps

## What it does
- Accepts: start `GlideDateTime`, working minutes (integer), a schedule sys_id (or name), and an optional timezone
- Uses `GlideSchedule` to hop across working/non-working periods and holidays
- Returns:
  - `endGdt` — the calculated ending `GlideDateTime`
  - `segments` — an ordered list of working sub-segments used (start/end per segment), useful for audit/debugging
  - `consumedMinutes` — total minutes consumed

## Configuration
At the top of the script you can configure:
- Default schedule sys_id (fallback)
- Default timezone (e.g., `Europe/London`)
- Maximum safety iterations

## How it works
The utility constructs a `GlideSchedule` from the provided schedule id, aligns the starting point, then iteratively consumes the requested working minutes across schedule segments (respecting holidays and timezone). It avoids recursion and uses a safety counter to prevent infinite loops.

## References
- GlideSchedule (Scoped) API. ServiceNow Docs.  
  https://www.servicenow.com/docs/ (GlideSchedule Scoped)  
- Server API overview (Zurich docs bundle). :contentReference[oaicite:1]{index=1}

## Example
```js
var util = new x_snc_example.NextBusinessWindow();
var result = util.addWorkingMinutes('2025-10-21 16:45:00', 95, 'your_schedule_sys_id', 'Europe/London');
// result.endGdt.getDisplayValue() -> "2025-10-22 09:20:00"
