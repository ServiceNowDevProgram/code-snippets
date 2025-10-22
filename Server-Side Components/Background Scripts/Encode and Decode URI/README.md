EncodeURI refers to the process of converting a string into that is safe for use in URI(Uniform Resource identifier). 
It is done by replacing characters that have special meanings in a URI with their percentage encoded equivalents.

The common use case in ServiceNow is in the Rest Message Endpoint.
This endpoint in Rest Message doesn't accept the special characters such as { so by using encodeURI we can encode it and 
then use it in the Rest message endpoint to get/post responses.

DecodeURI which just do the reverse by decoding the EncodedURI.
