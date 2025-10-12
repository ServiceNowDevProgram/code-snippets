# ServiceNow Form Background Macro

> A lightweight UI Macro to style ServiceNow forms with a custom background and simple element theming (labels, buttons, sections). 
---

## Features

* Adds a full-cover background image to a form (supports cover, center positioning).
* Makes table/form/section backgrounds transparent so the background shows through.
* Easy to customize (image path, label styles, button styles, additional CSS selectors).

## Requirements

* ServiceNow instance with admin access.
* An image to set as background
  
> ⚠️ Note: This macro uses Jelly/CSS that may not work as expected in some Next Experience workspaces or future UI updates. Test in a non-production instance first.

## Installation

1. **Upload the background image**

   * Navigate to **System UI > Images** and upload your background image (e.g., `formbg.png`).

2. **Create the UI Macro**

   * Go to **System UI > UI Macros** and create a new macro (e.g., `ui_form_background`).
   * Copy the example macro content below into the UI Macro.

3. **Create a UI Formatter**

   * Go to **System UI > Formatters**. Create a new formatter for the target table (for example, `incident` table).
   * In the *Formatter* field, reference the macro name you created (e.g., `ui_form_background.xml`).

4. **Add the Formatter to the Form Layout**

   * Open the form layout for the target table (Form Layout / Form Designer) and place the formatter region on the form.
   * Save and open a record to see the background applied.

## Compatibility

* Tested on ServiceNow classic forms (UI16). May require tweaks for Next Experience, Service Portal, or Workspace.
* If your instance uses strict Content Security Policy (CSP) or image hosting constraints, host the image in a supported location or adapt the implementation.

## Troubleshooting

* If no background appears:

  * Confirm the image is uploaded and the filename matches.
  * Ensure the formatter is placed on the form layout and published.
  * Inspect (browser devtools) to confirm CSS selectors are applied.
 
## Result
<img width="1838" height="922" alt="image" src="https://github.com/user-attachments/assets/14c29e0a-ad88-411e-b7ca-1c82eaeaf324" />

