# Stepper Widget

This custom widget provides a visually appealing **stepper** (multi-step progress indicator) for ServiceNow Service Portal, allowing you to display progress through steps such as campaign creation or onboarding.

## Features

- Shows steps with dynamic titles and highlights the current and completed steps.
- Steps and current step are passed in as widget options.
- Completed steps show a green icon.
- Handles widget options for showing steps and the current step.

<img width="1314" height="257" alt="image" src="https://github.com/user-attachments/assets/abc005ea-3dc2-49c7-9108-5008dcf620f4" />


## Widget Options

| Option        | Type   | Description                                   | Example                                  |
|---------------|--------|-----------------------------------------------|------------------------------------------|
| steps         | String | Stringified array of step names (JSON array)  | `["Step 1", "Step 2", "Step 3"]`         |
| currentStep   | Number | The current active step (0-based index)       | `1`                                      |

## Usage

1. Add the widget to your Service Portal page.
2. In the widget options, set:
   - **steps** as a JSON string array (e.g., `["Step 1", "Step 2", "Step 3"]`)
   - **currentStep** as the index of the current step (e.g., `1`)
<img width="1119" height="358" alt="image" src="https://github.com/user-attachments/assets/a51d48e1-1881-4b8c-9b67-06e0a0165c4c" />


