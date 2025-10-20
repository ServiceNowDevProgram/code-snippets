# Add HTML Input Field in GlideModal Window - ServiceNow

## Use Case
This snippet demonstrates how to include HTML input fields, including rich text editors, inside a GlideModal window in ServiceNow.

## Real-Life Example of Use  
In ServiceNow ITSM, support agents often need to add detailed notes or updates quickly without losing their workflow context. For instance, when investigating complex incidents, agents can click the "Add Details" button to open a modal with rich text input to document findings, attach formatted comments, or paste troubleshooting steps. This modal dialog prevents navigation away from the incident form, speeding up data entry and improving information capture quality.

## Why This Use Case is Unique and Valuable (Simple)
- Lets users enter rich text and HTML inputs right inside a popup window (GlideModal) without leaving the current page.
- Makes data entry faster and easier by avoiding navigation away from the form.
- Supports complex inputs like formatted text using editors such as TinyMCE.
- Helps improve quality and detail of notes and comments on records.
- Can be reused for different input forms or workflows in ServiceNow.
- Works smoothly within the ServiceNow platform UI for a consistent user experience.

## Steps to Implement
1. Create a UI Page named `rich_text_modal` with appropriate input fields (string and rich text).  
2. Create a UI Action (e.g., "Add Details") on the Incident table that opens the `rich_text_modal` UI Page within a GlideModal.  
3. Open an incident record and click the "Add Details" button to see the modal with the HTML input fields.

## Compatibility
This UI Page and UI Action is compatible with all standard ServiceNow instances without requiring ES2021 features.

## Files
`UI Page` , `UI Action` - are the files implementing the logic.
