
The GlideSession API allows you to store the client data in session and retrieve it.

Following are the example of the usage:

```var sample = {'name':'xyz','email':'xyz@abc.com'};```

```var sessionUpdate = new storeDataInSession();```

```gs.print(sessionUpdate.putDataInSession(sample));```

```var session = gs.getSession();```

```gs.print(session.getClientData('name'));```

