# Date Difference Snippet

**Author:** Harish  
**Category:** GlideDateTime / Date Calculations  
**Use Case:** Calculate the difference in days between two date/time values.

## Description
This snippet uses `GlideDateTime` and `gs.dateDiff()` to calculate the number of days between two given date/time strings.

## Example
```js
gs.info(getDateDifferenceInDays('2025-10-01 00:00:00', '2025-10-16 00:00:00'));
