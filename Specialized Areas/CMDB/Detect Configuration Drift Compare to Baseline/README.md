This ServiceNow business rule script is designed to detect configuration drift in a Configuration Item (CI) by comparing its current state to the most recent baseline record stored in the cmdb_baseline table.

What it Does – In Simple Terms:
Gets the latest baseline for the current CI.
Compares key fields (ram, cpu_count, os) between the current CI and the baseline.
If differences (a "drift") are found:
It logs the drift in a custom table (u_drift_log).
It triggers an event (ci.drift_detected) to possibly notify or take further action.
.
