
# How to fix a reference to the Choice [sys_choice] table

The Choice table is used internally by the platform and depending on the payload of an operation, for performance reasons the platform can decide that it is better to drop the table and insert all the values instead of perform updates on specific records.

When we insert a new record in a table, a new sys_id is generated. If we have the Choice table as a reference to provide choices for a particular field in our table, these choices will be lost every time the platform decides to recreate the Choice table.

A simple way to avoid this problem is to create a field of type Choice which indirectly uses the Choice table but it is the right way, or we can create our own table to maintain the Application choices.

Recently I received the mission to do exactly this: create a private choice table for an Application.

## The problem

A long time ago, the platform allowed a developer to choose the Choice table as a reference.

As a consequence, old custom applications may have fields referencing the Choice table directly.

This custom application was already in Production, so I needed to fix this on the fly.

## The solution

After a meeting with our ServiceNow Architect, we decided to break down the solution in three steps.

As the Tech Lead I delegated the step 1 to my best ServiceNow Developer, while assigning steps 2 and 3 to myself.

Step 1) Create the new table, grant the proper permission and populate the records. [1]

Table: choices

![App Screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjTjEvqeN4bOEMkeA515IR4TZiyB0iLCqn7RzKP_JjuWWeVrEGAirF30OAzVMNJvgOQ9bx-j1YNyJjkqrELlwjmg8A2fGUDPucuKAvaUbCJGws8gngu5BtLAu3zyQMRw-nXet2ImeAxgFqBKG_cpoTGZlDS6Mft0mBn2qkGwHtisyCxirhpSfEhlquZXT_H/s1942/Image%2026-07-2024%20at%2008.44.jpeg)

Step 2) Create a new reference field in your main table so that the referenced table now will be our own choice table.

![App Screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3ERvXm5QL-s3hhNjovKmHrwXeI0ELKitcyAr50Vbx_bfpLg0tsrs1u1o49vQHdqF1tZEhOARhvwR4ef2NgiB1uY8raW7RhioilfKJViPl7C1aMV7T0s7L-U5vXodMhgAKyaarBm1y8le8NvhEZk4t6-Qnhoq3OpAcYJWU4VhCn7RSXcSUvgwRvJNvTHEe/s1666/Image%2026-07-2024%20at%2008.45.jpeg)

Step 3) Develop a Fix Script to copy existing choices within the records to the new field.


The first idea that came to my mind was to match the Choice and choices tables with one thing I was sure they had in common: the value.

Within my main table, once I get the values stored in each record that refers the Choice table, I can select the sys_id of the corresponding record from my choices table. The sys_id from my choices table is exactly what I want to store in the new field I created in my main table.

The detail here was that in my main table these fields were not a simple reference, both were of type List.

So what I need to do is:

3.1 Search each record in my main table;
3.2 For each record, generate an array containing a list of 'value' regarding the field that is a reference to the Choice table;
3.3 With this array of old values, search my table choices to generate a list of sys_Ids (list of records from my choices table);
3.4 Update my main table record with the list of sys_Ids obtained in step 3.3

## Final thoughts


As we can see in KB0813643 this is a problem of the past. Nowadays your corporate instance has a Business Rule [2] as a security measure.

One great benefit of maintaining an internal choice table is that we can create a Data Administrator persona, who can use the platform back-end to deactivate/activate choices or create new ones without any deployment effort.

About the technical solution, since both field types were a List of records I was positive that I needed to create a list of sys_Ids to update each record at once.

After creating your GlideRecord variable regarding the main table, remember to use the method setWorkflow(false). With this your Business Rules will not be triggered during the Fix Script execution.

Another useful GlideRecord method when updating an entire table is called autoSysFields(false). It is used to disable the update of system fields (Updated, Created, etc).

Be aware that a new Fix Script is executed automatically in the moment a new App version is deployed. When we deploy an Application, the platform creates only the table structure and records are not moved.

In the deployment to the TEST instance, the Fix Script run and didn't update any record because it didn't find matches between my main table and the new choices table.

After the App deployment I asked my Operations team to import an XML file containing all the choices table records. After that we executed the Fix Script manually to populate the main table new field.

[[Watch the video]](https://www.youtube.com/watch?v=KX6S3dcKPKA&t=1s)


___
[1] I instructed my colleague to create the records with the same value existing within the Choice [sys_choice] table.

[2] Business rule "Prevent Reference to Choice [sys_choice]"