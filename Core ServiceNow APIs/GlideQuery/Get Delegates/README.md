# Get Delegates for user based on delegate type

Example snippet using GlideQuery to get the active delegates for a user based on the different types available;

- approvals
- notifications
- assignments
- invitations

Builds an initial GlideQuery and then adds in the optional queries.

Example call,

```
getDelegatesForType(gs.getUserID(), [ "approvals", "assignments" ]);
```

Might return an object similar to the following

```json
[
   {
      "name": "Mary Cruse",
      "sys_id": "46d77b47a9fe1981007c0b3faff3edf8",
      "starts": "2023-10-02 14:03:24",
      "ends": "2100-01-01 23:59:59"
   },
   {
      "name": "Fred Kunde",
      "sys_id": "75826bf03710200044e0bfc8bcbe5d2b",
      "starts": "2023-10-01 14:03:01",
      "ends": "2100-01-01 23:59:59"
   }
]
```
