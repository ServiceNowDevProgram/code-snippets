# Creates an HTML Table from an object

@param  {String} [title] - Title above table
@param  {Object} [table] - Object with headers attribute and row multi dimension array
@returns {String} HTML Table

### Example
```js
var table = {
header:['col1','col2'],
rows:[['row1col1','row1col2'],
        ['row2col1','row2col2']]
}

var hU = new HTMLUtils();
hU.createHTMLTable("Test",table);
```
### Output
```html
<p style='margin: 10px 0px 10px;'><b>Test</b></p><table class='template_TBL table'><tbody><tr><td>col1</td><td>col2</td></tr><tr><td>row1col1</td><td>row1col2</td></tr><tr><td>row2col1</td><td>row2col2</td></tr></tbody></table>
```