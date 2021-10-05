# onSubmit Ajax validation with no getXMLWait

Using getXMLWait() ensures the order of execution, but can cause the application to seem unresponsive, significantly degrading the user experience of any application that uses it.

Also, the getXMLWait method is not available in scoped applications.

This snippet simulates the behavior of the getXMLWait method.