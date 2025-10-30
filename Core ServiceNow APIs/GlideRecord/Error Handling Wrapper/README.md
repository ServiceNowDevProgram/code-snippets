# GlideRecord Error Handling Wrapper

## Description
This snippet provides a **safe execution wrapper** around GlideRecord queries.  
It helps avoid runtime errors due to invalid table names, malformed queries, or null references, and ensures graceful script continuation.

---

## Note
- Works in global or scoped applications.
- Suitable for Background Scripts, Business Rules, or Script Includes.
- Prevents script termination from invalid GlideRecord calls.

--- 

## Functionality
1. Validates table existence using `isValid()`.
2. Wraps GlideRecord operations in a `try...catch` block.
3. Logs detailed error messages via `gs.error()`.
4. Allows the developer to safely pass a callback for query operations.

---

## Usage Example
```js
safeQuery('incident', function (gr) {
    gr.addQuery('priority', 1);
    gr.query();
    while (gr.next()) {
        gs.info('High-priority Incident: ' + gr.number);
    }
});
```

## Output
```
High-priority Incident: INC0012345
High-priority Incident: INC0012346
```