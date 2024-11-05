# Description

When creating events for any message buses it might happen that you have to provide a so-called UUID within the payload. However you cannot just use any ServiceNow Sys ID as unique identifier as a version 4 UUID has to follow a certain format (see [Wikipedia](https://en.wikipedia.org/wiki/Universally_unique_identifier)). 

As I could not find any helper method within the ServiceNow API library I decided to implement my own version.

# Usage

Just call the function `generateUUID()` as often as you want. It will always generate a different UUID.

Example Result:

01ce5586-db98-1837-91cd-739e63c895b2
