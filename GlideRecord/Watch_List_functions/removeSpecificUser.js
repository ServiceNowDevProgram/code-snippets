//You can run this code from background script/fix script/explore UI.

var sysId = '32 bit guid'; //pass the 32 bit sys_id of the user you want to remove.

var inc = new GlideRecord('incident');
inc.get('number','INC0010112');// pass the correct number to get the record.

var arr = inc.watch_list.split(','); //split the watch list values and put them in an array.
var idx = arr.indexOf(sysId); //get the index of sys_id of user you want to remove from watch list.
arr.splice(idx,1);           // Remove the specific user from array. idx is the index from which you want to remove and '1' is the number of elements you want to remove.
inc.watch_list = arr.join(','); // join the array and set the values back to watch list.
inc.setWorkflow(false); //if you don't want any BR to run for this update.
inc.update(); // update the record
