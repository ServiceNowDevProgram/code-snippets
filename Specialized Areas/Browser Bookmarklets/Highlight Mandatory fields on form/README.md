## Highlight Mandatory Fields

**Description**
- This bookmarklet visually highlights all mandatory fields on a ServiceNow form by adding a glowing border or background around them.
- It helps developers, admins, or QA testers quickly see which fields are marked as mandatory.
- It also helps partial visually paired people to find the mandatory fields instead of looking for small * icon for field.
- This works as a toggle. One click highlights the mandatory fields and clicking again removes the highlight.

**Example :**

- When activated on a form (e.g. Incident, Request Item):
- Mandatory fields like Short description, Caller, etc get a soft glowing yellow border.
- Click again → glow is removed.

**How it works:**  
- Detects `g_form` context.
- Adds a temporary CSS class (`.mandatory-glow`) to all mandatory fields.
- Click again to remove the highlights.

**Sample screenshot**
<img width="1882" height="674" alt="image" src="https://github.com/user-attachments/assets/1320c9c3-976d-4bf0-92d5-e051825dbe6c" />



