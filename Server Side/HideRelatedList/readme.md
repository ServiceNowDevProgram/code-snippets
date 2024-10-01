
# How to hide a Related List

Do you know about the Related List that displays people who can approve or reject a document?

Recently a scenario came up where the developer needed to prevent the employee who created a record from approving that document.
It wasn't common because usually the operational level creates the document while a manager approves it.
Leaving this question of personas aside and focusing on the problem, what would be a possible solution?

The first workaround that came to my mind was to hide the Approval list if the user who registered was viewing his own record.
A workaround is not the ultimate solution. Just a palliative fix while we find time to think about the ideal one.

The action plan

1) Every record has a field called sys_created_by;
2) On the front-end (client side) we have access to an API called Glide User that has some information about the logged in user. Among them is the name in the userName property.

What if we create a Client Script of type onLoad* that compares these two fields and, if they are the same, simply hides the Approvers related list?
To see the related list name created for your table, you can access the platform and go to System UI > Related lists.


Now that you know the related list name, your script would look like script.js in this folder.

To get the value of the sys_created_by field it must be in the form. You can leave it read-only or even hidden but it must exist on the form.

A Client Script of type onLoad is executed whenever the form is opened.