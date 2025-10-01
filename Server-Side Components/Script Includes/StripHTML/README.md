# StripHTML
Script Include that removes all HTML from a specific string.

It doesn't use the typical `Class.create`, instead it is a simple javascript function.
Check out this blog post for more info about the "Function Pattern": https://codecreative.io/blog/interface-design-patterns-function-pattern/

## Example Script
```javascript
var someHTML = "<span><b>Eaque pariatur nemo facere accusantium non enim.</b></span>";
var plainText = StripHTML(someHTML);
gs.debug(plainText);
```