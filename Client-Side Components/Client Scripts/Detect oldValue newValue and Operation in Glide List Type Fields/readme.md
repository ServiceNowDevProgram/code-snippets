In Client Scripts, oldValue will display the value of last value/record which is stored in that field. 
For new records, it is generally empty and for existing records it displays the value which is stored after load.
If we will try to change the value in that field, it will still show oldValue the same value which was there during the load of form.

So, In order to identify the oldValue on change(as it does in business rule(previous)), This script comes handy and also it will
detect the action performed.


This onChange Client script comes handy when dealing with Glide List type fields where we have to detect whether the value was added or removed and returns the display name of users who were added/removed along with name of operation performed.

Setup details:

onChange client Script on [incident] table
Field Name: [watch_list]
Script: Check [detectOldValuenewValueOperation.js] file
Script Include Name: watchListCandidatesUtil (client callable/GlideAjax Enabled - true), Check [watchListCandidatesUtil.js] file for script



Output:

Currently there is no one in the watchlist field:

<img width="873" height="298" alt="image" src="https://github.com/user-attachments/assets/a46ca53a-f031-4bf9-9f85-2056c408b66b" />


Adding [Bryan Rovell], It shows the operation was addition, oldValue as 'No record found' as there was no value earlier.New Value shows the name of the user (Bryan Rovell)
<img width="870" height="443" alt="image" src="https://github.com/user-attachments/assets/484284b6-846e-424c-b9c8-a53278f48c72" />


Adding 2 users one by one:

<img width="987" height="484" alt="image" src="https://github.com/user-attachments/assets/35dfe96a-c932-4f95-9c8e-bdb48b1c7b5f" />


Removing 2 at once:

<img width="879" height="496" alt="image" src="https://github.com/user-attachments/assets/c83d4e01-f150-44cb-9078-9841072ec949" />

