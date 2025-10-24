**Steps to Activate**
1. Open the portals you want to disable right-click in "sp_portal" table.
2. Open the theme attached to the portal.
3. In the theme under "JS Includes" relatd list, create new JS include and select the UI script you created.
Go to your portal and try to roght click, it will prevent and show the alert message.

**Use Case**
1. Many high security organizations like banks do not want their images or links to be copied through "inspect" so right-click need to be disabled.
2. Many organizations want their source code to be hidden so they prevent right-click.


 **Note**
  1. This UI script is applied through portal theme , so it will be specific to portals using that theme. It will not have instance wide affect.
