Edit Last Entered Work Notes

This UI action is built specifically to edit the last entered work notes by the user in incident form or any table which support this journal fields.

There is some restriction around journal fields/ work notes as user cannot edit or adjust the work notes that they entered. If they wish to edit it, I have introduced a new
UI action which calls the UI pages which will automatically populates the last entered work notes/comments and user can adjust and submit it.

Key actions: 
sys_journal_field :
 list.value = newcomment;  // update the new comment

 sys_audit:
 list1.newvalue = newcomment
list1.oldvalue = '';     // clear the old value and update the new value
 
sys_history_set:
Delete the history record associate with the incident record
