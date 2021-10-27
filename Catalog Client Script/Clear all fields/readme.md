# Clear all fields on a catalog item form

This only works on the service portal, be sure to set the script UI Type to either "All" or "Mobile / Service Portal". Typically used with an OnChange catalog client script when you would like to reset all the fields after a certain variable is changed.

This function does support an exclusion list if there are fields you would like to exclude from being reset, typically you would want to add the field that triggered to the change to the exlusion

### Example

```js
clearFields(['field1', 'field2']);
```

All fields on the form **except** field1 and field2 will be cleared.