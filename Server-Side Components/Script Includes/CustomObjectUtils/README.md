# CustomObjectUtils

A utility class to provide methods for safely accessing nested object properties. The class can be initialized to use either ES5 or ES12 (ECMAScript 2021) methods.

## Initialization

To use the utility, you need to create an instance of the `CustomObjectUtils` class. By default, it uses the ES5 methods. If you want to use the ES12 methods, pass `true` to the constructor.

```javascript
var utils = new CustomObjectUtils(); // For ES5
var utils = new CustomObjectUtils(true); // For ES12
```

## Methods

### safeAccess (ES5)

Safely accesses nested object properties.

- **Parameters**:
  - `obj` (Object): The object to access.
  - `path` (string): The dot-separated path to the property.
- **Returns**: The accessed value or `false` if not found.
- **Example**:

```javascript
var myObj = { a: { b: { c: 42 } } };
var value = utils.safeAccess(myObj, 'a.b.c');
console.log(value);  // Outputs: 42
```

### safeAccessModern (ES12)

Safely accesses nested object properties using modern JavaScript features.

#### Modern Features Used:

- **Optional Chaining** (`?.`): Allows reading the value of `key` within a chain of connected objects without having to explicitly check if each reference in the chain is valid.
- **Nullish Coalescing** (`??`): Returns the right-hand operand when the left operand is `null` or `undefined`.

