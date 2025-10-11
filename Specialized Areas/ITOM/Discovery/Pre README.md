# ServiceNow Discovery Pre Sensor Script: IP Router Association

This script is a **ServiceNow Discovery Pre Sensor Script** designed to enrich discovery payload data before it reaches the **Identification and Reconciliation Engine (IRE)**.  

It focuses on linking **Interface Cards (`cmdb_ci_interface_card`)** to their parent **IP Routers (`cmdb_ci_ip_router`)** by resolving the router name to its corresponding `sys_id` in the CMDB.


## Overview

When ServiceNow Discovery runs a pattern that identifies multiple components (e.g., routers and their interface cards), some payload items may contain **router names instead of sys_ids**.  
The IRE requires sys_ids for accurate relationship building.  

This script ensures that:
- The `u_configuration_item` field on interface cards is replaced with the actual `sys_id` of the corresponding router.
- The router’s `managed_by_group` field is also copied to the interface card record.
- Payload is properly formatted and ready for IRE ingestion.

##  Script Logic

### Step-by-step Flow
1. **Parse Payload:**  
   Converts the input payload JSON string into an object for processing.

2. **Iterate Items:**  
   Loops through each payload item and filters those with `className = cmdb_ci_interface_card`.

3. **Router Resolution:**  
   For each interface card:
   - Reads the router name from `u_configuration_item`.
   - Searches for a matching router record in `cmdb_ci_ip_router`.
   - If found:
     - Replaces the router name with its `sys_id`.
     - Copies the router’s `managed_by_group` value.

4. **Return Updated Payload:**  
   Returns the modified payload back to Discovery for further processing by the IRE.

---

##  Example Behavior

### **Before Script Execution**
```json
{
  "items": [
    {
      "className": "cmdb_ci_interface_card",
      "values": {
        "name": "Router-1/Gigabit0/1",
        "u_configuration_item": "Router-1"
      }
    }
  ]
}

### **After Script Execution**
{
  "items": [
    {
      "className": "cmdb_ci_interface_card",
      "values": {
        "name": "Router-1/Gigabit0/1",
        "u_configuration_item": "1b23cdef6f3123006a12ff3b8b3ee490",
        "managed_by_group": "287ebd7da9fe198100f92cc8d1d2154e"
      }
    }
  ]
}

