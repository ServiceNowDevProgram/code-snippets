# 🧾 ServiceNow Change Schedule Enhancement  
### _(UI Scripts: `sn_chg_soc.change_soc`, `sn.chg_soc.config`, `sn.chg_soc.data`)_  

---

## 📘 Overview  

This customization extends the **ServiceNow Change Schedule (Change Calendar)** functionality.  
The enhancement adds visibility and interactivity to the Change Calendar by including:  

- A **Short Description** column in the Change Schedule view.  
- A **configurable UI** allowing users to toggle visibility of columns such as _Configuration Item_, _Short Description_, and _Duration_.  
- Integration of additional data services for fetching and rendering change records with enhanced details.  
- A **Change Schedule button** that refreshes and displays these changes dynamically.  

The result is a more informative and user-friendly Change Schedule interface for Change Managers, CAB members, and ITSM users.  

---

## 🧩 Architecture  

| Module | Description |
|--------|-------------|
| **`sn_chg_soc.change_soc`** | Main controller and directive for the Change Schedule Gantt Chart UI. Handles initialisation, rendering, zoom, and popovers. |
| **`sn.chg_soc.config`** | Manages configuration settings for displayed columns and schedules (blackout, maintenance). Allows toggling visibility. |
| **`sn.chg_soc.data`** | Provide the data on the gantt chat from the change records


Requirement:
As an ITIL user, you can click the Change Schedule button to navigate directly to the Change Schedule view.
This allows you to see all planned changes and plan your own changes accordingly, especially useful for customers who do not have a well-established CMDB integrated with Discovery.

<img width="1505" height="809" alt="image" src="https://github.com/user-attachments/assets/4af1b6cb-87e6-4a53-a243-6592fbf548c1" />

<img width="1913" height="877" alt="image" src="https://github.com/user-attachments/assets/fc0a6f46-febd-45bb-a741-78462fa1512a" />

