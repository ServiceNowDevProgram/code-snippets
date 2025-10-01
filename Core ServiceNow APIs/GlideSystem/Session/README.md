GlideSystem (referred as "gs") is used to get the current user session which we are using to set the custom key and value which are used in client side scripts.

Example client script used to retrieve it

```
function onLoad(){
 var value = g_user.getClientData("custom_key");
 console.log("Client data "+value);
}
```

