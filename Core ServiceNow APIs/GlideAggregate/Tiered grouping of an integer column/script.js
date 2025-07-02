var count = new GlideAggregate('x_snc_code_snippet_event');
//count.addEncodedQuery('sys_created_onONLast 90 days@javascript:gs.beginningOfLast90Days()@javascript:gs.endOfLast90Days()^targetISNOTEMPTY');
count.addEncodedQuery('userISNOTEMPTY^pointISNOTEMPTY^point!=0');
count.groupBy('user');
count.addAggregate('SUM', 'point');
count.orderByAggregate('SUM', 'point');
count.query();
var items = [];
while (count.next()){
  var item = {};
  item.username = count.user.username.toString();
  item.points = parseInt(count.getAggregate('SUM', 'point').split('.')[0]);
  items.push(item);
}
var leaderboard = [];
var leaderboard_index = 0;
var count = 0;
if (Math.floor(items.length*.05) > 0){
  leaderboard.push('Top 5% of contributors:');
  count = Math.floor(items.length*.05);
  for (var i05 = 0; i05 < count; i05++){
    leaderboard.push(items[leaderboard_index].username + '.');
    leaderboard_index++;
  }
  leaderboard.push('');
}
if (Math.floor(items.length*.1) > 0){
  leaderboard.push('Top 10% of contributors:');
  count = Math.floor(items.length*.1) - Math.floor(items.length*.05);
  for (var i10 = 0; i10 < count; i10++){
    leaderboard.push(items[leaderboard_index].username + '.');
    leaderboard_index++;
  }
  leaderboard.push('');
}
if (Math.floor(items.length*.25) > 0){
  leaderboard.push('Top 25% of contributors:');
  count = Math.floor(items.length*.25) - Math.floor(items.length*.1) - Math.floor(items.length*.05);
  for (var i25 = 0; i25 < count; i25++){
    leaderboard.push(items[leaderboard_index].username + '.');
    leaderboard_index++;
  }
  leaderboard.push('');
}
if (Math.floor(items.length*.5) > 0){
  leaderboard.push('Top contributors (50%):');
  count = Math.floor(items.length*.5) - Math.floor(items.length*.25) - Math.floor(items.length*.1) - Math.floor(items.length*.05);
  for (var i50 = 0; i50 < count; i50++){
    leaderboard.push(items[leaderboard_index].username + '.');
    leaderboard_index++;
  }
  leaderboard.push('');
}
leaderboard.push('Other contributors:');
while (leaderboard_index < items.length){
  //leaderboard.push(items[leaderboard_index].username + ' (' + items[leaderboard_index].points + ').');
  leaderboard.push(items[leaderboard_index].username + '.');
  leaderboard_index++;
}

outputs.leaderboard = leaderboard.join('\n');
