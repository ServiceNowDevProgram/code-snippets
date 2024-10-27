/**
 * Stories / Tasks Report
 * Stories, Changes, Problems, Tasks
 * Run from Scripts - Background
 * @author: Kevin Custer
 */

// User Variables - Change These ////////////
var userName  = "aileen.mottern";
var startDate = "2021-10-01 00:00:00";
var endDate   = "2021-10-31 23:59:59";
/////////////////////////////////////////////

// Script Variables
var storyCount = 0;
var taskCount = 0;

// Print Stories
var grStory = new GlideRecord("rm_story");
var query =  'assigned_to.user_name=' + userName + '^';
    query += "state!=4" + '^';
    query += 'sys_created_onBETWEEN' + startDate + '@' + endDate + '^OR';
    query += 'closed_atBETWEEN' + startDate + '@' + endDate;

grStory.addEncodedQuery(query);
grStory.orderBy("closed_at");
grStory.query();

gs.print('           Stories / Tasks Report for: ' + userName);
gs.print('');
gs.print('              Report Start: ' + startDate);
gs.print('                Report End: ' + endDate);
gs.print('');
gs.print('');
gs.print('Stories Assigned or Closed:');
gs.print('');

// Print Header Row
gs.print(this.padEnd("Number", 15) +
         this.padEnd("Assigned", 12) +
         this.padEnd("Closed (*)", 12) +
         this.padEnd("Product", 40) +
         this.padEnd("CI", 70) +
         this.padEnd("State", 25) +
         "Description");
gs.print(Array(225).join('-'));

while (grStory.next()) {
  gs.print(this.padEnd(grStory.number.toString(), 15) +
           this.padEnd(grStory.sys_created_on.getByFormat('MM-dd-yyyy'), 12) + 
           this.padEnd(grStory.closed_at.getByFormat('MM-dd-yyyy') || '', 12) +
           this.padEnd(grStory.product.getDisplayValue().substring(0,38), 40) +
           this.padEnd(grStory.cmdb_ci.getDisplayValue().substring(0,68), 70) +
           this.padEnd(grStory.state.getDisplayValue(), 25) +
           grStory.short_description);
  storyCount++;
}

gs.print('');
gs.print('Total Stories: ' + storyCount);
gs.print('');
gs.print('');


// Print Tasks
var grTask = new GlideRecord("task");
var query = 'assigned_to.user_name=' + userName + '^';
query += "state!=4" + '^';
query += 'sys_class_name!=rm_story^sys_class_name!=rm_scrum_task^';
query += 'sys_created_onBETWEEN' + startDate + '@' + endDate + '^OR';
query += 'closed_atBETWEEN' + startDate + '@' + endDate;

grTask.addEncodedQuery(query);
grTask.orderBy("closed_at");
grTask.query();

gs.print('Non-Story Tasks Assigned or Closed:');
gs.print('');

// Print Header Row
gs.print(this.padEnd("Number", 15) +
         this.padEnd("Assigned", 12) +
         this.padEnd("Closed (*)", 12) +
         this.padEnd("CMDB CI", 40) +
         this.padEnd("State", 25) +
         "Description");
gs.print(Array(155).join('-'));

while (grTask.next()) {
  gs.print(this.padEnd(grTask.number.toString(), 15) +
           this.padEnd(grTask.sys_created_on.getByFormat('MM-dd-yyyy'), 12) + 
           this.padEnd(grTask.closed_at.getByFormat('MM-dd-yyyy') || '', 12) +
           this.padEnd(grTask.cmdb_ci.getDisplayValue().substring(0,38), 40) +
           this.padEnd(grTask.state.getDisplayValue(), 25) +
           grTask.short_description);
  taskCount++;
}

gs.print('');
gs.print('Total Tasks: ' + taskCount);
gs.print('');
gs.print('');
gs.print('* - Sorted by ascending values');

function padEnd(str, padAmount) {
  if (typeof str === 'undefined') 
    return '';

  var padding = Array(padAmount + 1).join(' ');
  return (str + padding).substring(0, padding.length);
}