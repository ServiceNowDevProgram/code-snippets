**Details**

This is a on change client script on sys_template table. This script will restrict users to select defined fields while template creation.
Type: OnChange
Field: Template
Table: sys_template

**Use Case**

There is an OOB functionality to restrict fields using "**save as template**" ACL, but it has below limitations:
1. If the requirement is to restrcit more number of fields (example: 20), 20 ACLs will have to be created.
2. The ACls will have instance wide effect, this script will just restrict on client side.
