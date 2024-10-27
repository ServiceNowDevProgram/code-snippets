Bussienss Rule to delete the User Role from table like 'Service Category User Roles [service_category_user_role]'
Steps:
 - Navigate to your instance 
 - Open Business Rule Table [sys_script] and click on New
 - Create After BR and provide below condition
 - When to Run
        - AFter
        - Order: 100
        - Operation: Delete
  - Provide the condition as:
   !current.user_role.nil()
  - Select Advance option and use the script
