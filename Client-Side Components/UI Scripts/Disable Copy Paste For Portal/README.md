**Steps to Activate**
1. Open the portals you want to disable copy/paste operation in "sp_portal" table.
2. Open the theme attached to the portal.
In the theme under "JS Includes" relatd list, create new JS include and select the UI script you created. Go to your portal and try to copy/paste in any catalog item field or any text field on portal.The operation will be prevented with the alert message.

**Use Case**
1. Many high security organizations like banks do not want the users to copy paste account number or passwords to ensure safety.
2. Many input form want the users to re-enter the password or username without copying from other fields.

This UI script is applied through portal theme , so it will be specific to portals using that theme. It will not have instance wide affect.
