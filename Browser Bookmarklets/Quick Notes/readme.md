## Quick Note

A bookmarklet that opens a new browser tab with a blank editable page for quick notes. Copy and paste work with or without (right-click) formatting. Includes javascript string methods `'variable_name'.get()` to get the contents of the page into a variable and `variable_name.set()` to set the variable contents into another page. This allows for quick processing and output of the results.

```html
data:text/html, <title>Quick Note</title><script>String.prototype.get=function(){window[this]=document.body.innerText};String.prototype.set=function(){w=window.open();w.document.body.innerHTML='<pre style="font: 1rem/1.5 monospace;margin:0 auto;padding:2rem;">'+this.toString()+'</pre>'};</script><body contenteditable style="font: 1rem/1.5 monospace;margin:0 auto;padding:2rem;">
```

## Example
Enter some text onto the page.  
> `This is some text`  

Open the Browser Console.  
Type a string literal with the `.get()` method.   
> `'t'.get()`  

The string literal becomes a variable name containing the contents of the page.  
You can now manipulate the string however needed.  
To see the results, you can simply log the info to the console or you can post it to a new page. To post the content to a new page, call the `.set()` method.  
> `variable_name.set()`

The command below will open a new tab containing "THIS IS SOME TEXT"  
> `t.toUpperCase().set();` 
