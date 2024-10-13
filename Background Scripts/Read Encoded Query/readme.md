This background script code to get the any encoded query in redable format.
You need to paste the encoded query in the quotes of the function API which you want to read in simple layman format 

Input Required as below

1. Table name on which the query is.
2. Any encoded query which you want to read

   Input Eg.

   Table Name- incident
   Encoded query  - 'active=true^short_descriptionLIKEtest'

   Output- Readable Query is Active = true .and. Short description contains test


   Please note that this API is allowed to worked in global application. It is not applicable in scoped application.
