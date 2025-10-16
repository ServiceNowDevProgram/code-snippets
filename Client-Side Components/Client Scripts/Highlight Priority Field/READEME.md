# 🟢 Highlight Incident Priority Field  

## Overview  
This **ServiceNow Client Script** enhances the user experience on the *Incident* form by visually highlighting the **priority field** using color indicators.  
It helps agents quickly identify the urgency of a ticket based on its priority level.

---

## Features  
- 🎨 Runs automatically on form load (`onLoad`)  
- ⚡ Applies background and text color styling to the `priority` field  
- 🧠 Uses distinct colors for each priority level:
  - **Critical (1)** → Red  
  - **High (2)** → Orange  
  - **Moderate (3)** → Yellow  
  - **Low (4)** → Light Green  
  - **Planning (5)** → Gray  

---

## Configuration  

| **Property** | **Value** |
|---------------|-----------|
| **Table** | `incident` |
| **Type** | `onLoad` |
| **Script Name** | `Highlight Priority Field` |
| **Active** | `true` |

---

## Script  

```javascript
function onLoad() {
    var priority = g_form.getValue('priority');
    var control = g_form.getControl('priority');

    if (control) {
        switch (priority) {
            case '1': // Critical
                control.style.backgroundColor = '#ff4d4d'; // Red
                control.style.color = 'white';
                control.style.fontWeight = 'bold';
                break;
            case '2': // High
                control.style.backgroundColor = '#ffa500'; // Orange
                control.style.color = 'black';
                control.style.fontWeight = 'bold';
                break;
            case '3': // Moderate
                control.style.backgroundColor = '#ffff66'; // Yellow
                control.style.color = 'black';
                control.style.fontWeight = 'bold';
                break;
            case '4': // Low
                control.style.backgroundColor = '#d3ffd3'; // Light Green
                control.style.color = 'black';
                control.style.fontWeight = 'bold';
                break;
            case '5': // Planning
                control.style.backgroundColor = '#e0e0e0'; // Gray
                control.style.color = 'black';
                control.style.fontWeight = 'bold';
                break;
            default:
                control.style.backgroundColor = ''; // Reset
                control.style.fontWeight = 'normal';
        }
    }
}
