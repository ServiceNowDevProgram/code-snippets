For the teams who are using large number of VTBs on a daily basis based on multiple categories, for them adding multiple users to a Visual Task Board (VTB) manually is a tedious task.
To solve this, we can use a Fix Script to automate the process. 
Visual Task Boards are stored in the vtb_board table, and board members are linked through the vtb_board_member table. 
This script will allow us to add multiple users to a specific board by querying and inserting them as board members.

Explanation
- Set the boardSysId variable to the sys_id of the Visual Task Board to which you want to add users.
- Add the sys_id values of the users you want to add to the board in the userSysIds array.
- The script checks if the board with the specified boardSysId exists in the vtb_board table. If it doesn’t, it will display an error message.
- After adding all users, the script displays a message with the total number of users added to the board.
