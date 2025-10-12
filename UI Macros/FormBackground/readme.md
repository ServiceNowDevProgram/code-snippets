# ServiceNow UI Macro - Form Background Macro

> A lightweight UI Macro to style ServiceNow forms with a custom background and simple element theming

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

## Result

<img width="1838" height="922" alt="image" src="https://github.com/user-attachments/assets/92b81219-69e0-4f20-96ca-8d1bdc92a0ab" />

