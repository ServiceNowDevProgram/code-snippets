# Language Selector with Flags

A language selector widget for the Portal.  
The user can change the instance language without having to leave the Portal.

<img width="255" height="95" alt="image" src="https://github.com/user-attachments/assets/af130ec4-d724-4b07-a38f-afd858b7eba2" />
<img width="234" height="195" alt="image" src="https://github.com/user-attachments/assets/a2de8161-a922-4376-904d-b16f81dcc573" />


## What it does
- Displays a dropdown with flags and language names.
- Automatically updates the user's language in the `sys_user` table.
- Reloads the page to apply the new language immediately.

## Files
- **HTML Template:** renders the dropdown with flag emojis and labels.  
- **Client Script:** handles language selection and sends the PATCH request.  
- **Server Script:** provides the current user ID and stored language.  

## Example
When the user selects **🇪🇸 Spanish**, the widget updates their user record and reloads the Portal in Spanish.

## Prerequisites
- The language selected **must be installed and active** in the instance.  
