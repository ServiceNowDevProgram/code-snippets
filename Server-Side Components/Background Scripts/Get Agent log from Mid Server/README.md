# ServiceNow MID Server Log Retrieval

This script is used to grab a agent log file from a specified **MID Server** on demand.

## What Does It Do?

It sends a command through the **ECC Queue** to the MID Server, asking it to locate a file (like `agent0.log.0`) and send its contents back to the ServiceNow instance.

---

## How to Use the Function

The function is named `getMidServerAgentLog`.

| Parameter | What it is | Example Value |
| :--- | :--- | :--- |
| **`midServerName`** | The name of your MID Server. | `"DevMidServer01"` |
| **`logFileName`** | The name of the file you want. | `"agent0.log.0"` |

### Quick Example:

```javascript
// Change "YOUR_MID_SERVER" to the actual name!
var mid = "YOUR_MID_SERVER"; 
var log = "agent0.log.0";

getMidServerAgentLog(mid, log); 
// This creates the request in the ECC Queue.
