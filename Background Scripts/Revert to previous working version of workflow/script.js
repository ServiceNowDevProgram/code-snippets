var updatevftoprevious = new GlideRecord('wf_workflow_version');

if (updatevftoprevious.get('4f215adf1b533d54bc97dce0b24bcb31')) //pass sys_id of current workflow version here
{
    updatevftoprevious.published = false; //sets the published status to false
    updatevftoprevious.update();
}


var updatevftopreviousvf2 = new GlideRecord('wf_workflow_version');
if (updatevftopreviousvf2.get('2cb9a6418713b5140b0f0d490cbb3512')) //pass sys_id of workflow version that needs to be reverted to
{
    updatevftopreviousvf2.published = true;//sets the published status to false
    updatevftopreviousvf2.update();
}
