//Get user session object.
var session = gs.getSession();

//Set value for custom key
session.putClientData("custom_key","custom_value");

//Print the value for the key supplied
gs.print(session.getClientData("custom_key"));
