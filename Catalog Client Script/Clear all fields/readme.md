# Clear all fields on a catalog item form

This works on both the native platform and service portal / mobile. Typically used with an OnChange catalog client script when you would like to reset all the fields after a certain variable is changed.

This function does support an exclusion list if there are fields you would like to exclude from being reset, typically you would want to add the field that triggered to the change to the exlusion

### Example

```js
clearFields(['field1', 'field2']);
```

All fields on the form **except** field1 and field2 will be cleared.