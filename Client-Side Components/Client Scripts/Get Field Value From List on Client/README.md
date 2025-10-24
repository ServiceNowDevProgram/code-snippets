# Use Case

Let;s consider a scenario. Some validation logic needs to be executed on click of a list banner button. The field values to be validated are present right on the screen, so why bother writing a GlideAjax code + client-callable Script Include to call the server and run the same validation on the server. Client-side ```GlideList``` API provides the ```getCell()``` method to fetch visible cell values from the list.


# Usage

Write a client-side code on the UI Action and add the code in ```script.js``` file.
```g_list.getCell(String recSysId, String fieldName)```


# Explanation

Values of visible fields/cells can be extracted using the ```getCell(String recSysId, String fieldName)``` method of client-side class ```GlideList (g_list)```. Required parameters:
  - ```String recSysId``` - SysID of the record/row whose value is to be fetched
  - ```String fieldName``` - Name of the field whose value is to be fetched

**Returns:** ```HTMLElement (HTMLTableCellElement)```, string content can be extracted using ```.innerText``` property
