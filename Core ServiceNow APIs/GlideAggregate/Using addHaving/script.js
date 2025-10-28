//Script which is showing how to use addHaving
//In this example, we are displaying only users which have more than 35 roles

//GlideAggregate query to sys_user_has_role table
var gaRole = new GlideAggregate('sys_user_has_role');

//Aggregate count on user field
gaRole.addAggregate('count', 'user');

//Adding addHaving is an equivalent to addQuery but on aggregate functions
//In this case we are getting from the list only users which exists more than 35 times - that means they have more than 35 role assignments.
gaRole.addHaving('count', 'user', '>', '35');
gaRole.query();

//Going through all examples which are matching addHaving
while (gaRole.next()) {

    //Logging which users match addHaving condition
    gs.info('User: ' + gaRole.user.getDisplayValue() + ' (' + gaRole.user + ') have more than 35 roles!');
}
