## Overview
This script converts a UTC date/time field in ServiceNow to the **user's local time** using **GlideDateTime**.  
Useful for notifications, reports, dashboards, or any situation where users need **localized timestamps**.

## Table and Field Example
- **Table:** `incident`
- **Field:** `opened_at` (stored in UTC)
