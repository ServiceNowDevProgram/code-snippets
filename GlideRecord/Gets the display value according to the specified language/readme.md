Get the display value according to the specified language.

(Install Language Plugin)

```javascript
var gr = new GlideRecord("incident");
gr.setLimit(1);
gr.query();
gr.next();
var user = gs.getUser();
var lang = user.getPreference("user.language");

// Japanese
user.setPreference("user.language", 'ja');
var outputJA = '' + gr.state.getLabel() + ' = ' + gr.state.getDisplayValue();
// English
user.setPreference("user.language", 'en');
var outputEN = '' + gr.state.getLabel() + ' = ' + gr.state.getDisplayValue();
gs.info(outputJA + ' / ' + outputEN);

user.setPreference("user.language", lang);
```
