This code snippet will help you to make fields read only/hide if a the logged in user belongs to a specific group.
To achieve this, we need to create a display Business rule and an onLoad client script.
Display BR will look for the group of logged in user and return true or false in a scratchpad variable.
Client script will validate the value and make the field read only/hide.
