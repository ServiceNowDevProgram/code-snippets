### Overview

Added a **modern, fully responsive Email Layout** for ServiceNow notifications.  
This layout provides a professional and dynamic look for system emails such as approvals, alerts, and workflow updates.

---

### 🔑 Features

- Clean, responsive HTML with inline CSS (Outlook-safe)
- Dynamic placeholders for subject, body, recipient, and links
- Supports unsubscribe and preference management variables
- Compatible with all standard ServiceNow notification types
- Easily customizable header colors, logo, and footer content

---

### 📁 Files Included

| File          | Description                          |
| ------------- | ------------------------------------ |
| `Script.html` | Email Layout definition (HTML + CSS) |
| `README.md`   | Setup guide and usage instructions   |

---

### ⚙️ Installation

1. Navigate to **System Policy → Email → Email Layout** → New
2. Paste the HTML layout above into the content field
3. Save and name it **"Modern Notification Layout"**
4. Assign this layout to your email notifications (under "Layout" field)

---

### 💡 Example Use Case

Used for travel approvals, expense updates, password resets, or ticket notifications:

```html
${mail_script:travel_notification}
```
