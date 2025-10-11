
# Auto-Populate Short Description Client Script

## Overview

This client script is designed to enhance the user experience in ServiceNow by automatically populating the 'Short Description' field when a user selects a category for an incident or request. It simplifies the data entry process, ensures consistency in short descriptions, and saves time for users.

## How It Works

When a user selects a category from the provided options, the script appends a predefined prefix to the existing 'Short Description' value, creating a more informative short description.

### Configuration

To configure and use this client script in your ServiceNow instance, follow these steps:

1. **Create a Client Script:**

   - Log in to your ServiceNow instance as an admin or developer.
   - Navigate to "System Definition" > "Client Scripts."
   - Create a new client script and give it a name (e.g., "Auto-Populate Short Description").

2. **Copy and Paste the Script:**

   - Copy the JavaScript code provided in this README.
   - Paste the code into your newly created client script.

3. **Attach to 'category' Field:**

   - Save the client script and ensure it's active.
   - Attach the client script to the 'category' field of the relevant table (e.g., Incident, Request) where you want to enable this functionality.

4. **Define Your Category-to-Short-Description Mappings:**

   - Modify the script to define your own mappings for categories and their corresponding short description prefixes. Customize the `categoryToShortDescription` object to match your requirements.

5. **Testing:**

   - Test the functionality by creating or editing an incident or request record.
   - Select a category, and observe how the 'Short Description' field is automatically populated based on your mappings.

## Example Mapping

Here's an example of how you can define category-to-short-description mappings in the script:

```javascript
var categoryToShortDescription = {
  'Hardware': 'Hardware Issue - ',
  'Software': 'Software Issue - ',
  'Network': 'Network Issue - ',
  'Other': 'Other Issue - '
};
```

You can customize these mappings to align with your organization's specific categories and short description conventions.

## Benefits

- Streamlines data entry for users.
- Ensures consistent and informative short descriptions.
- Saves time and reduces the risk of human error.
- Enhances user experience in ServiceNow.
