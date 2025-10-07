# Count Open Incidents per Priority Using GlideAggregate

## Overview
This script dynamically calculates the **number of open incidents** for each priority level using **server-side scripting** in ServiceNow.  
Priority levels typically include:  
+ 1 – Critical  
+ 2 – High  
+ 3 – Moderate  
+ 4 – Low  

The solution leverages **GlideAggregate** to efficiently count records grouped by priority. This approach is useful for:  
+ Dashboards  
+ Automated scripts  
+ Business rules  
+ SLA monitoring and reporting  

---

## Table and Fields
+ **Table:** `incident`  
+ **Fields:** `priority`, `state`  
