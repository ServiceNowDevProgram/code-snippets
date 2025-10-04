# ServiceNow JavaScript Helpers

A set of lightweight JavaScript helper functions for use in ServiceNow Script Includes, Business Rules, and Client Scripts.  
No external dependencies, just pure JavaScript.  

---

## 📅 Date Helpers (`dateHelpers.js`)

- `getTodayISO()` → Returns today's date in `YYYY-MM-DD`
- `getTodayReadable()` → Returns today's date in human-readable string (`Sat Oct 04 2025`)
- `getCurrentYear()` → Returns current year as a number
- `formatUnixTimestamp(unixSeconds)` → Converts UNIX timestamp into `{ fullDateTime, date, time }`
- `formatDateTime(jsDate)` → Converts JS Date/string into `"YYYY-MM-DD HH:mm:ss"`

---