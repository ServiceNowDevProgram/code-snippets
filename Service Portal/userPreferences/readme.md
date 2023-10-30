# userPreferences
By injecting `userPreferences` factory into your controller function you can easily get and set user preferences.

## Usage example

### Reading user preference

```javascript
api.controller=function(userPreferences) {
  /* widget controller */
  var c = this;
	
	userPreferences.getPreference('rowcount').then(function(response){
		c.rowcount = response;
	});
	
};
```

### Setting a user preference

```javascript
api.controller=function(userPreferences) {
  /* widget controller */
  var c = this;
	
	userPreferences.setPreference('rowcount', 10);
	
};
```
