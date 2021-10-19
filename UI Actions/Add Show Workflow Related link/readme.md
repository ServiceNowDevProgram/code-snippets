# Description
There are many cases where: we would have workflows on custom tables or non task tables or we would like to see the "Show Workflow" Related Link for ease of accessibility to the workflow.
The shared code will help show this related link on any table record that has a workflow associated with it.

## Installation

```javascript
"Table": "Select the table that you would like this UI action to be available on (preferably table with workflows)";
"Onclick" : "showWorkflow()"
"Active" : "True"
"Show Update" : "True"
"Client" : "True"
"Form Link" : "True"
"Condition" : "new global.Workflow().hasWorkflow(current)"
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)