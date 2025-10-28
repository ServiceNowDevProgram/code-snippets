# Purpose
After first login to a freshly provisioned ServiceNow instance it is recommended creating personalized admin accounts. The following script will do the job for you. Just pass the most important properties to the method and a new user is being created with some preconfigured values such as roles and preferences.
# Usage
```javascript
var strUserSysID = createAdminUser(
  'john.doe',
  'John',
  'Doe',
  'john.doe@example.com'
);

if (strUserSysID != null) {
    //user has been created successfully
}
```
