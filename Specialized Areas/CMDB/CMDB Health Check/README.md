# CMDB Health Check – Non-Operational Installed Applications

## Purpose
This script checks for Application Configuration Items (CIs) that are currently:
- Installed (`install_status = 1`)
- Non-operational (`operational_status = 2`)

## Why Run This Check?
Such records can signal potential CMDB data quality issues, as an application marked "Installed" should generally be in an active/operational state. Spotting these mismatches early helps:
- Prevent inaccurate reports and dashboards
- Improve incident/change assignment accuracy
- Maintain overall CMDB integrity

## Output
The script logs the count of Application CIs that fit the criteria:
