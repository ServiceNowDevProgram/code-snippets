#  Report IT Change Request: Change Calendar Widget

A **Service Portal widget** for displaying interactive **Change Request Calendar Reports** in ServiceNow.
This widget embeds a ServiceNow report, allows visual exploration of change data, and enhances user experience through color-coded legends and a modal view for detailed record insights.

---

## Features

* **Report Embedding:** Displays a selected ServiceNow report dynamically in the portal.
* **Interactive Legend:** Color legend automatically updates based on selected highlight field (`risk`, `type`, `state`).
* **Change Request Details Modal:** Clicking a change number opens a modal showing detailed record information (number, description, risk, state, start and end dates).
* **Dynamic Color Mapping:** Fetches `sys_ui_style` and `sys_choice` data to visualize change request status colors.
* **Accessible & Responsive UI:** Fully keyboard-accessible with clear color indicators and responsive design.

---

## Configuration

### **Widget Options**

| Option       | Type                     | Description                           |
| ------------ | ------------------------ | ------------------------------------- |
| `report_id`  | Reference (`sys_report`) | Select the ServiceNow report to embed |
| `show_title` | Boolean                  | Toggle visibility of report title     |

### **Installation Steps**

1. Import the widget XML into your ServiceNow instance via **Studio** or **Update Set**.
2. Add the widget to a Service Portal page (e.g., Change Dashboard).
3. In widget options:

   * Select your desired **report** (`sys_report`).
   * Enable “Show Title” if required.
4. Save and reload the page — the report will render dynamically.

---

## Color Legend

* Automatically generated from `sys_ui_style` table for elements `type`, `state`, and `risk`.
* Displays color-coded labels for visual clarity.
* Updates automatically when the highlight field dropdown changes.

**Example:**

| Element | Color        | Meaning            |
| ------- | ------------ | ------------------ |
| State   | 🔵 Implement | Change in progress |
| Risk    | 🟡 High      | Requires review    |
| Type    | 🟢 Normal    | Standard change    |

---

## Modal Preview of Change Details

Clicking a change number in the calendar opens a modal window with:

| Field               | Description                  |
| ------------------- | ---------------------------- |
| Change Number       | Linked record reference      |
| Short Description   | Summary of change            |
| Description         | Detailed explanation         |
| Type / Risk / State | Key metadata fields          |
| Planned Start & End | Change implementation window |

---

## Technical Overview

| Component         | Technology                              | Purpose                                            |
| ----------------- | --------------------------------------- | -------------------------------------------------- |
| **Client Script** | AngularJS + jQuery + `$uibModal`        | Event handling, modal logic, legend updates        |
| **Server Script** | GlideRecord API                         | Fetch report and change details securely           |
| **CSS**           | Custom SCSS / SP Variables              | Responsive layout, color blocks, and accessibility |
| **Template**      | Angular bindings (`ng-if`, `ng-repeat`) | Dynamic rendering of legend and report             |

---

## Security & Performance

* Uses `spUtil.get()` for secure data retrieval via the widget server script.
* Enforces ACL-based record access (`change_request` table).
* Sanitizes HTML using `$sce.trustAsHtml` for safe modal rendering.
* Optimized DOM operations and `$timeout` to reduce UI latency.

---

## Dependencies

* **ServiceNow Studio or App Engine Studio**
* **Service Portal Enabled**
* **Change Management Application** (`change_request` table)
* **Performance Analytics & Reporting Plugin** (`com.snc.pa.sp.widget`)

Optional:

* **Color Mapping in `sys_ui_style`**
* **Active `sys_report` record**

---

## Example Use Case

> The Change Manager wants a visual, color-coded view of all scheduled changes for the month.
> Using the **Report ITS Change Request** widget, they embed their “Change Calendar by Risk” report into the Service Portal.
> They can quickly filter changes, view color-coded statuses, and open detailed records—all from one place.

---

## Testing Scenarios

| Test                       | Expected Result                                       |
| -------------------------- | ----------------------------------------------------- |
| Load widget without report | Displays “Select a report in widget options!” message |
| Click on change link       | Modal opens with record details                       |
| Change highlight dropdown  | Legend updates to reflect new color group             |
| No matching record         | Displays “Record not found” in modal                  |

---

## Future Enhancements

* Filter changes by assignment group or service.
* Add “Export as PDF” or “Add to Calendar” options.
* Integrate with CAB meeting module for review visualization.
* Replace jQuery with native AngularJS `$element` bindings for performance.

---

## Contributors

* **Developer:** Admin / ServiceNow Platform Engineer
* **Maintainers:** Performance Analytics & Reporting Widget Team
* **Scope:** Global (`x_snc_pa.sp.widget`)

---
Please find the screenshot below 

![WhatsApp Image 2025-10-26 at 09 59 27 (1)](https://github.com/user-attachments/assets/a2e024cf-87be-4f29-9c5a-aee3e2dffbfd)

![WhatsApp Image 2025-10-26 at 09 59 27 (2)](https://github.com/user-attachments/assets/bd610e94-08ac-47be-842d-e8c59dadce70)

![WhatsApp Image 2025-10-26 at 09 59 27](https://github.com/user-attachments/assets/1333e974-6b56-48b8-b1c2-340e0a35e0af)

<img width="637" height="454" alt="image" src="https://github.com/user-attachments/assets/07d34c8b-429d-4522-b68d-71603f0206eb" />


