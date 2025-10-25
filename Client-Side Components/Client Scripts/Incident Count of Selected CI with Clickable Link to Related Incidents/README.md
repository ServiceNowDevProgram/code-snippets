# Incident Count of Selected Configuration Item with Info Message and Link to its Related Incident 

Displays a message showing the count of open incidents associated with a selected **Configuration Item (CI)** whenever the **Configuration Item** field changes on the Incident form.

- Helps quickly identify whether the selected CI has existing incident by fetching and displaying active incident counts (excluding *Resolved*, *Closed*, and *Canceled* states).  
- Shows an **info message** with a **clickable link** that opens a filtered list of related incidents for that CI  
- If more than five incidents are linked, a **warning message** appears suggesting Problem investigation for frequent or repeated CI issues.
- Uses an **onChange Client Script** on the *Configuration Item* field and a **GlideAjax Script Include** called from the client script to fetch the incident count  

---

## Warning Message displayed on form when CI has 5 or more incidents 

![CI_Incident_Message_Count_1](CI_Incident_Message_Count_1.png)

---

## Info Message displayed on form when CI has no incidents

![CI_Incident_Message_Count_2](CI_Incident_Message_Count_2.png)

---

## Info Message displayed on form when CI has incidents less than 5

![CI_Incident_Message_Count_3](CI_Incident_Message_Count_3.png)

---

## Upon clicking the url link filter list opens with incidents associated with CI

![CI_Incident_Message_Count_4](CI_Incident_Message_Count_4.png)

---
