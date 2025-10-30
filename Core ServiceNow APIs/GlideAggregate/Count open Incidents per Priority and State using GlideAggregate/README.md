# Count open Incidents per Priority and State using GlideAggregate

## Overview
This script will dynamically calculate the **number of open incidents** for each priority level and also give you a total for what 
current state the Incident is in using **server-side scripting**
Priority levels typically include:  
+ 1 – Critical  
+ 2 – High  
+ 3 – Moderate  
+ 4 – Low

Incident State typically include:
+ New
+ In Progress
+ On Hold
+ Resolved
+ Closed
+ Canceled

The scripting solution leverages **GlideAggregate** to efficiently count records grouped by priority and state. This scripts approach
is useful for:
+ Dashboards
+ Business Rules
+ SLA monitoring and reporting
 
--
## Table and Fields
+ **Table:** Task
+ **Fields:** Priority, State
