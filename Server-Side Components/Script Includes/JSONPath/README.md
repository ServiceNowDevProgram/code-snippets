# JSONPath Plus

Analyse, transform, and selectively extract data from JSON documents (and JavaScript objects).

jsonpath-plus expands on the original specification to add some additional operators and makes explicit some behaviors the original did not spell out.

You can try it within the [browser demo](https://jsonpath-plus.github.io/JSONPath/demo/)

## Features

- **Compliant** with the original jsonpath spec
- Convenient **additions or elaborations** not provided in the original spec:
  - `^` for grabbing the **parent** of a matching item
  - `~` for grabbing **property names** of matching items (as array)
  - **Type selectors** for obtaining:
    - Basic JSON types: `@null()`, `@boolean()`, `@number()`, `@string()`, `@array()`, `@object()`
    - `@integer()`
    - The compound type `@scalar()` (which also accepts `undefined` and
      non-finite numbers when querying JavaScript objects as well as all of the basic non-object/non-function types)
    - `@other()` usable in conjunction with a user-defined `otherTypeCallback`
    - Non-JSON types that can nevertheless be used when querying
      non-JSON JavaScript objects (`@undefined()`, `@function()`, `@nonFinite()`)
  - `@path`/`@parent`/`@property`/`@parentProperty`/`@root` **shorthand selectors** within filters
  - **Escaping**
    - `` ` `` for escaping remaining sequence
    - `@['...']`/`?@['...']` syntax for escaping special characters within
      property names in filters
  - Documents `$..` (**getting all parent components**)
- In addition to queried values, **can return various meta-information**
  including paths or pointers to the value, as well as the parent
  object and parent property name (to allow for modification).
- **Utilities for converting** between paths, arrays, and pointers
- Option to **prevent evaluations** permitted in the original spec or supply
  a **sandbox** for evaluated values.
- Option for **callback to handle results** as they are obtained.

## Setup

1. create a script include `JSONPath`
2. fill in the script field with the content of [JSONPath.js file](JSONPath.js)
3. you should now be able to call it via globally available function e.g. `JSONPath(path, json)`

## Usage

The full signature available is:

```
var result = JSONPath([options,] path, json, callback, otherTypeCallback);
```

The arguments `path`, `json`, `callback`, and `otherTypeCallback`
can alternatively be expressed (along with any other of the
available properties) on `options`.

Note that `result` will contain all items found (optionally
wrapped into an array) whereas `callback` can be used if you
wish to perform some operation as each item is discovered, with
the callback function being executed 0 to N times depending
on the number of independent items to be found in the result.
See the docs below for more on `JSONPath`'s available arguments.

See also the [API docs](https://jsonpath-plus.github.io/JSONPath/docs/ts/).

### Properties

The properties that can be supplied on the options object or
evaluate method (as the first argument) include:

- **_path_** (**required**) - The JSONPath expression as a (normalized
  or unnormalized) string or array
- **_json_** (**required**) - The JSON object to evaluate (whether of
  null, boolean, number, string, object, or array type).
- **_autostart_** (**default: true**) - If this is supplied as `false`,
  one may call the `evaluate` method manually.
- **_flatten_** (**default: false**) - Whether the returned array of results
  will be flattened to a single dimension array.
- **_resultType_** (**default: "value"**) - Can be case-insensitive form of
  "value", "path", "pointer", "parent", or "parentProperty" to determine
  respectively whether to return results as the values of the found items,
  as their absolute paths, as [JSON Pointers](https://tools.ietf.org/html/rfc6901)
  to the absolute paths, as their parent objects, or as their parent's
  property name. If set to "all", all of these types will be returned on
  an object with the type as key name.
- **_sandbox_** (**default: {}**) - Key-value map of variables to be
  available to code evaluations such as filtering expressions. (Note
  that the current path and value will also be available to those
  expressions; see the Syntax section for details.)
- **_wrap_** (**default: true**) - Whether or not to wrap the results
  in an array. If `wrap` is set to `false`, and no results are found,
  `undefined` will be returned (as opposed to an empty array when
  `wrap` is set to true). If `wrap` is set to `false` and a single
  non-array result is found, that result will be the only item returned
  (not within an array). An array will still be returned if multiple
  results are found, however. To avoid ambiguities (in the case where
  it is necessary to distinguish between a result which is a failure
  and one which is an empty array), it is recommended to switch the
  default to `false`.
- **_preventEval_** (**default: false**) - Although JavaScript evaluation
  expressions are allowed by default, for security reasons (if one is
  operating on untrusted user input, for example), one may wish to
  set this option to `true` to throw exceptions when these expressions
  are attempted.
- **_parent_** (**default: null**) - In the event that a query could be
  made to return the root node, this allows the parent of that root node
  to be returned within results.
- **_parentProperty_** (**default: null**) - In the event that a query
  could be made to return the root node, this allows the `parentProperty`
  of that root node to be returned within results.
- **_callback_** (**default: (none)**) - If supplied, a callback will be
  called immediately upon retrieval of an end point value. The three arguments
  supplied will be the value of the payload (according to `resultType`),
  the type of the payload (whether it is a normal "value" or a "property"
  name), and a full payload object (with all `resultType`s).
- **_otherTypeCallback_** (**default: \<A function that throws an error**
  **when @other() is encountered\>**) - In the current absence of JSON
  Schema support, one can determine types beyond the built-in types by
  adding the operator `@other()` at the end of one's query. If such a
  path is encountered, the `otherTypeCallback` will be invoked with the
  value of the item, its path, its parent, and its parent's property name,
  and it should return a boolean indicating whether the supplied value
  belongs to the "other" type or not (or it may handle transformations and
  return false).

### Instance methods

- **_evaluate(path, json, callback, otherTypeCallback)_** OR
  **_evaluate({path: \<path\>, json: \<json object\>, callback:_**
  **_\<callback function\>, otherTypeCallback:_**
  **_\<otherTypeCallback function\>})_** - This method is only
  necessary if the `autostart` property is set to `false`. It
  can be used for repeated evaluations using the same configuration.
  Besides the listed properties, the latter method pattern can
  accept any of the other allowed instance properties (except
  for `autostart` which would have no relevance here).

### Class properties and methods

- **_JSONPath.cache_** - Exposes the cache object for those who wish
  to preserve and reuse it for optimization purposes.
- **_JSONPath.toPathArray(pathAsString)_** - Accepts a normalized or
  unnormalized path as string and converts to an array: for
  example, `['$', 'aProperty', 'anotherProperty']`.
- **_JSONPath.toPathString(pathAsArray)_** - Accepts a path array and
  converts to a normalized path string. The string will be in a form
  like: `$['aProperty']['anotherProperty][0]`. The JSONPath terminal
  constructions `~` and `^` and type operators like `@string()` are
  silently stripped.
- **_JSONPath.toPointer(pathAsArray)_** - Accepts a path array and
  converts to a [JSON Pointer](https://tools.ietf.org/html/rfc6901).
  The string will be in a form like: `/aProperty/anotherProperty/0`
  (with any `~` and `/` internal characters escaped as per the JSON
  Pointer spec). The JSONPath terminal constructions `~` and `^` and
  type operators like `@string()` are silently stripped.

## Examples

Given the following JSON, taken from <http://goessner.net/articles/JsonPath/>:

```json
{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      {
        "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}
```

### Filter all books cheaper than 10

```javascript
var result = JSONPath("$..book[?(@.price<10)]", json);

// [
//   {
//     "category": "reference",
//     "author": "Nigel Rees",
//     "title": "Sayings of the Century",
//     "price": 8.95
//   },
//   {
//     "category": "fiction",
//     "author": "Herman Melville",
//     "title": "Moby Dick",
//     "isbn": "0-553-21311-3",
//     "price": 8.99
//   }
// ]
```

### Grab all authors

```javascript
var result = JSONPath("$..author", json);

// [
//   "Nigel Rees",
//   "Evelyn Waugh",
//   "Herman Melville",
//   "J. R. R. Tolkien"
// ]
```

More examples can be found [here](https://github.com/JSONPath-Plus/JSONPath/blob/main/README.md#syntax-through-examples)

## Credits

The code has been taken from [JSONPath-Plus repo](https://github.com/JSONPath-Plus/JSONPath) and slightly adjusted to be able to run on the platform JavaScript engine.
