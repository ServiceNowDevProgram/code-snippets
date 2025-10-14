## Incident Root-Cause Predictor

### Overview
The **Incident Root-Cause Predictor** automatically classifies incoming Incidents into categories like *Network, Hardware, Application,* or *Security* based on keywords in the description.  
This helps in faster triaging and routing tickets to the right support teams.

---

## How It Works
1. A user submits an Incident.
2. A **Business Rule** runs on insert.
3. It calls the **Script Include – `RootCausePredictor`**.
4. The predictor scans the description and returns a probable root-cause category.

---
## Business Rule Script (How to call Script Include on BR)
    var util = new global.RootCausePredictor();
    
(function executeRule(current) {
    var util = new global.RootCausePredictor();
    var cat = util.predict(current.description);
    current.u_root_cause = cat;
    current.work_notes = "Auto-classified as: " + cat.toUpperCase();
})(current);

--------------
## Sample Input and Output
Input : A user logs a ticket:
“Wi-Fi keeps disconnecting every few minutes.”

The Script Include scans for the word “Wi-Fi”, which matches the Network keyword list.
OutPut: 

System automatically sets field u_root_cause = "Network"
Work note added: “Auto-classified as: NETWORK”
