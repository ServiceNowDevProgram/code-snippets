# 💡 Dynamic Field Helper — Smart Tooltips for Form Fields

### Overview

The **Dynamic Field Helper** is a lightweight ServiceNow **UI Script** that automatically adds contextual tooltips beside form field labels, helping users understand each field’s purpose, business rules, or dependencies — without modifying individual forms.

It’s a plug-and-play enhancement designed for developers and admins who want to improve usability and reduce confusion across complex forms.

---

### ✨ Features

- 🧩 **Automatic Tooltips** — Adds ⓘ icons beside important field labels
- ⚡ **Dynamic Data Source** — Pulls tooltip data from GlideAjax or static JSON config
- 🧠 **No Form Edits** — Works across all forms dynamically
- 🎨 **Lightweight & Clean Design** — Subtle hover animations and color themes
- 🔒 **Scoped-Safe** — Works seamlessly in scoped or global applications

---

### 🛠️ Installation

1. Navigate to **System UI → UI Scripts → New**
2. Name it **`dynamic_field_helper`**
3. Paste the following code:
   ```js
   // (See full script in the code file)
   ```
4. Mark as ✅ Active and ✅ Global

5. Include it in forms or client scripts (or globally via UI Policy)

### 🔧 Optional: Dynamic GlideAjax Version

For fully dynamic field tips, add a Script Include named FieldHelpProvider (Client Callable):

``

var FieldHelpProvider = Class.create();
FieldHelpProvider.prototype = {
getHelpText: function() {
var result = {
short_description: "Provide a short summary of the issue.",
category: "Select the most relevant category for routing."
};
return JSON.stringify(result);
},
type: 'FieldHelpProvider'
};

``

### 💡 Use Cases

Service Catalog forms that confuse end-users

Complex HR or Finance forms with many custom fields

Developer sandboxes where multiple admins need field context
