# CustomUserUtils

A collection of methods related to user roles, group memberships and other utilities.

## hasRoleExactly();

The use of this function is to check whether the user have exact role, not admin. This is similar to g_user.hasRoleExactly() used in client side scripting.

### Example

`javascript: new CustomUserUtils().hasRoleExactly('62826bf03710200044e0bfc8bcbe5df1', 'itil'))` 

## hasAnyRoleExactly();

The use of this function is to check whether the user have any one of the exact role specified.

### Example

`javascript: new CustomUserUtils().hasAnyRoleExactly('62826bf03710200044e0bfc8bcbe5df1', 'itil,knowledge'))`


## hasAllRoles();

The use of this function is to check whether the user have if the user have all of the roles specified exactly.

### Example

`javascript: new CustomUserUtils().hasAllRoles('62826bf03710200044e0bfc8bcbe5df1', 'itil,knowledge'))`


## isMemberOf();

The use of this function is to check whether the user is member of the specified group or not.

### Example

`javascript: new CustomUserUtils().isMemberOf('62826bf03710200044e0bfc8bcbe5df1', 'Hardware'))`

## isMemberOfAny();

The use of this function is to check whether the user is member of any one of the specified groups or not.

### Example

`javascript: new CustomUserUtils().isMemberOfAny('62826bf03710200044e0bfc8bcbe5df1', 'Service Desk, Hardware, Database'))`

## isMemberOfAll();

The use of this function is to check whether the user is member of all of the specified groups or not.

### Example

`javascript: new CustomUserUtils().isMemberOfAll('62826bf03710200044e0bfc8bcbe5df1', 'Service Desk, Hardware, Database'))`

## lineManagers();

The use of this function is to get the managers (users who have atleast one direct reportee).

### Example

`new CustomUserUtils().lineManagers()`

