In Client Scripts, oldValue will display the value of last value/record which is stored in that field. 
For new records, it is generally empty and for existing records it displays the value which is stored after load.
If we will try to change the value in that field, it will still show oldValue the same value which was there during the load of form.

So, In order to identify the oldValue on change(as it does in business rule(previous)), This script comes handy and also it will
detect the action performed.


This onChange Client script comes handy when dealing with Glide List type fields where we have to change the value
in that particular field and detect the value before and after change and also detect the operation which was 
performed(addition or removal).

Setup details:

onChange client Script on [incident] table
Field Name: [watch_list]
Script: Check [detectOldValuenewValueOperation.js] file


Output:

Currently there is no one in the watchlist field:

<img width="784" height="232" alt="image" src="https://github.com/user-attachments/assets/245339ac-04b3-47db-922a-912cca32fba5" />

Adding [amos.linnan] , It shows the operation was addition, newValue(user's sysId) as well as oldValue(empty)
<img width="751" height="387" alt="image" src="https://github.com/user-attachments/assets/e6a5d255-44bc-45a1-950b-fd3cb4599f26" />


Adding 2 users one by one:

<img width="1903" height="353" alt="image" src="https://github.com/user-attachments/assets/512e77ed-9116-4027-8fd2-446654ef3891" />


Removing 2 at once:

<img width="1684" height="375" alt="image" src="https://github.com/user-attachments/assets/54c233de-62af-4e9e-948f-f23e55a155e5" />
