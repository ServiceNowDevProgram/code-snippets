# Smart Field Suggestions Based on Keywords

## Category
Client-Side Components / Client Scripts

## Description
This is an onChange Client Script designed for the Incident table that dynamically suggests and populates the Category, Subcategory, and Priority fields based on keywords detected in the Short Description field. By matching keywords, it prompts users to confirm applying suggestions aligned with backend choice values for seamless integration.

## Use Case
During incident creation or update, manually categorizing tickets correctly is critical for IT operations efficiency. This snippet automates early triage by analyzing user-entered short descriptions, providing actionable suggestions to improve categorization accuracy, accelerate routing, and enhance resolution speed.

## How to Use
- Add this script as an "onChange" client script on the Incident table's `short_description` field.
- Ensure the Category, Subcategory, and Priority fields have choice lists aligned with backend values specified in the snippet.
- Modify the keyword list to align with your organizational terminologies if needed.
- The user will be prompted with suggestions and may confirm or dismiss them, allowing balanced automation and human control.

## Why This Use Case is Unique and Valuable

- Dynamically assists in categorizing incidents early, improving routing and resolution time.
- Uses only platform APIs (`g_form`) without custom backend code or external integrations, making it lightweight and maintainable.
- Uses real backend choice values ensuring seamless compatibility with existing configurations, reducing errors.
- Provides prompt suggestions with user confirmation, balancing automation and user control.
- Easily adaptable for other fields, keywords, or use cases beyond Incident management.
- Designed without fragile DOM manipulations, following ServiceNow best practices, tailored for real environments.

## Compatibility
This client script is compatible with all standard ServiceNow instances without requiring ES2021 features.

## Files
- `Smart Field Suggestions Based on Keyword.js` — the client script implementing the logic.


