# CheckCriteria Script Include

This script include is used to check if a user has access to a specific catalog item based on "Available for" and "Not Available for" user criteria in ServiceNow. It supports admin overrides and custom user checks.


## Usage

The `CheckCriteria` script include provides a method `itemCriteria` which checks if a user meets the criteria to access a catalog item.

### Syntax

```javascript
var check = new CheckCriteria();
var result = check.itemCriteria(item, adminOverride, userToCheck);
```

### Parameters

1. **`item`** (string): 
   - The sys_id of the catalog item you want to check access for.
   - This parameter is **required**.

2. **`adminOverride`** (boolean, optional): 
   - Specifies whether admin override should be taken into account.
   - If `true`, users with the `admin` role will always have access to the item, even if they do not match the user criteria.
   - Defaults to `false` if not provided.

3. **`userToCheck`** (string, optional): 
   - The user ID of the user you want to check access for.
   - If not provided, the currently logged-in user (`gs.getUser()`) will be used by default.

### Return

- **`true`** if the user has access to the catalog item.
- **`false`** if the user does not have access to the catalog item.

### Example

```javascript
var check = new CheckCriteria();

// Example 1: Check if the current user has access to the catalog item
var hasAccess = check.itemCriteria('12345abcdef'); // '12345abcdef' is the sys_id of the catalog item

// Example 2: Check access for a specific user with an admin override
var hasAccess = check.itemCriteria('12345abcdef', true, 'abc123user'); // 'abc123user' is the user ID of the user
```

In the first example, the script checks if the current user can access the specified catalog item. In the second example, it checks if the specified user can access the item and allows admin override.

## Error Handling

- If the `item` parameter is not provided or is `null`, an error message will be logged in the system logs.
- The script also logs errors when unable to retrieve user criteria for the catalog item.
