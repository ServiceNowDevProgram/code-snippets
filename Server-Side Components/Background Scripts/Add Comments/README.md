There have been scenarios where you are working on an integration and one of the usecase is to add comments on a record. In this scenario once you add comments directly
to the record by assigning the value in the comments or work_notes field, it captures it as a integration user in the activity formatter. But with setJournalEntry() 
method you can pass the user_name and it will add the comment on behalf of the user whose user_name is passed. In this way it easy to track who is actually modifying 
the record or adding the comments. Hope this will be a helpful snippet.

In this function the paramters are defined as:
tableName: Name of the table on which you are adding the comments.
recSysId: sys_id of the record for which the comment is getting added.
userName: user_name of the user who is adding the comments
fieldName: It can be either comments or work_notes or any custom journal entry field.
