The snippet can be used to dynamically execute any work on the mid server. You could run any commands on a server, powershell scripts, LDAP queries and other functions depending on the output probes which are supported by ServiceNow. You need to be aware of the ECC queue output and input structure used by ServiceNow to issue these commands. To get these formats, you could execute the same functionality and monitor the ECC queue for its structure. 

Sample Usage.

For eg, inorder to query on LDAP for all users whose name is starting with A. You could call the following function.

```
var outputId = executeWorkOnMid('Mid-Server-01', 'LDAPQuery', 'LDAPBrowseProbe', 'fdc4cd3fdb6a8f003a339e04db96199d',  '<?xml version="1.0" encoding="UTF-8"?><parameters><parameter name="type" value=""/><parameter name="value" value="(&amp;(objectClass=person)(cn=A*))"/><parameter name="chars" value="*"/></parameters>'));
```
```
The payload argument contains the LDAP query as (&amp;(objectClass=person)(cn=A*)) which would return the results in an input ECC queeue
```
The outputId can then be passed to the second function to fetch the response as an XML object. The ECC queue works asynchronously, so may need to wait for few seconds until the response is received in the input queue.

```
gs.sleep(5000);
var xmlResponse = fetchResponseFromMid(outputId);
//gs.print(xmlResponse);
```
