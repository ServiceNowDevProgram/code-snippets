# Get Field Label in Specific Language

This Script Include enables retrieving the label of a certain table field in any given language. 
Often in multi-language instances, the label of a field must be printed via a script. Instead of retrieving the value each time individually this script include can be re-used (e.g. by multiple Business Rules or Mail Scripts) 

### Instruction

Call the Script Include via the following example code from any server-side script (e.g. Business Rule, Mail Script or Flow Action). If you want, you can also make the script include client callable and make it available to client scripts. Make sure to provide the correct table name, field name and language in your function call. Be aware, that in some cases the field may be on a parent table. In this case you would have to provide the parent table name to the script. 

```javascript
var util =new LanguageUtils();
gs.log(util.getLabel("incident", "category", "de"));
```


### Benefits
- If no label in the provided language can be found, the default English label is returned
- Re-use this script include and call t from different types of script (e.g. Business Rule, Mail Script or Flow Action)

