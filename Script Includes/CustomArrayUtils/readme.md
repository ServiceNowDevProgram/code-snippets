# CustomArrayUtils

`CustomArrayUtils` is a utility class designed to provide various array manipulation functions. The class offers both ES5 and modern ES12 versions of each function. By default, the ES5 versions are used, but you can opt for the modern ES12 versions by initializing the class with the `useES12` parameter set to `true`.

## Initialization

To use the ES5 version (default):

```javascript
var utils = new CustomArrayUtils();
```

To use the ES12 version:

```javascript
var utils = new CustomArrayUtils(true);
```

## Functions

### arrToJSON (ES5)

Converts an input array to JSON.

Example:

```javascript
var arrayObj = ['name','John','age','30'];
var outputObj = utils.arrToJSON(arrayObj, true);
```

Output: `{"name":"John","age":"30"}`

#### arrToJSONModern (ES12)

- Uses `let` and `const` for variable declarations.
- Adopts arrow functions for concise representation.
- Utilizes modern array methods like `forEach`.

### mergeArray (ES5)

Compares two arrays of objects and provides add/remove/edit based on the difference of the two arrays.

Example:

```javascript
var original = [{sys_id: '1', name: 'John'}, {sys_id: '2', name: 'Jane'}];
var modified = [{sys_id: '1', name: 'Johnny'}, {sys_id: '3', name: 'Jake'}];
var outputObj = utils.mergeArray(original, modified, 'sys_id', 'name');
```

Output:

```
[
    {sys_id: '1', name: 'Johnny', action: 'edit'},
    {sys_id: '2', name: 'Jane', action: 'delete'},
    {sys_id: '3', name: 'Jake', action: 'insert'}
]
```

#### mergeArrayModern (ES12)

- Uses `let` and `const` for variable declarations.
- Adopts arrow functions for concise representation.
- Utilizes modern array methods like `map` and `filter`.
- Uses `Map` for efficient key-value grouping.
- Utilizes object spread operator (`...`) for merging.

### groupBy (ES5)

Groups array elements based on a key function.

Example:

```javascript
var outputObj = utils.groupBy(['one', 'two', 'three'], function(word) { return word.length; });
```

Output: `Map { 3 => ['one', 'two'], 5 => ['three'] }`

#### groupByModern (ES12)

- Uses arrow functions for concise representation.
- Utilizes modern array methods like `reduce`.
