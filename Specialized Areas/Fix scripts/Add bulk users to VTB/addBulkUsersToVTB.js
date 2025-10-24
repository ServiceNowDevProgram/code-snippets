// Replace with the sys_id of the Visual Task Board you want to add users to
var boardSysId = 'sys_id_of_board';

// Replace with sys_ids of different users to be added to VTB
var userSysIds = ['user_1','user_2','user_3'];

var board = new GlideRecord('vtb_board');
if (!board.get(boardSysId)) 
{
    gs.addErrorMessage("This Visual Task Board does not exist.");
} 
  
else 
{
var addedCount = 0;
userSysIds.forEach(function(userId) 
{
        var boardMember = new GlideRecord('vtb_board_member');
        boardMember.initialize();
        boardMember.board = boardSysId;
        boardMember.user = userId;
        boardMember.insert();
        addedCount++;
});
gs.addInfoMessage(addedCount + " users have been successfully added to your Visual Task Board: " + board.getValue('name'));
}
