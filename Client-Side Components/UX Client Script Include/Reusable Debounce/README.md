## Add a debounce to search fields or other inputs with a client script
Inputs, Typeaheads, and other components that can be used for searching the database, caches, or local storage. However, performing a search for every keypress or other change is often unnecessary and uses more resources than strictly necessary. This UX Client Script Include is a small utility for managing debounces, allowing a 'cool-off' from inputs before performing the activity.

### Steps
1. Create a new UX Client Script Include (`sys_ux_client_script_include`), using the script from the associated snippet
2. Create a new Client Script in UI Builder, and add the include you created in 1 as a dependency
3. Within the Client Script, import the Script Include as follows, replacing `global.DebounceUtilName` with the scope and UX Client Script Include name:
    ```js
    const DebounceUtil = imports["global.DebounceUtilName"]();
    ```
4. Within the Client Script, declare a `function` to be called inside the debounce function

### Example usage
```js
/**
* @param {params} params
* @param {api} params.api
* @param {any} params.event
* @param {any} params.imports
* @param {ApiHelpers} params.helpers
*/
function handler({api, event, helpers, imports}) {
    const DebounceUtil = imports["global.DebounceUtil"]();
    var debounceSearch = DebounceUtil.debounce(takeAction, 500, helpers);
    debounceSearch();

    function takeAction(){
        const searchTerm = event.payload.value;
        api.setState('fullRefQuery',`nameLIKE${searchTerm}`);
    }
}
```
