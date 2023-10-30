/*
Table A - Users(u_user)                 Table B - Likes(u_likes)
ID(sys_id):     Name(u_name):           User(u_user):   Activity(u_activity):
...b65a         Patrik                  Maria           Movies
...b6ba         Albert                  Patrik          Climbing
...b6df         Maria                   Patrik          Code
...b6c9         Darwin                  (empty)         Rugby
...b662         Elizabeth               Darwin          Tennis
                                        Maria           Tennis
        
                                    
Database View
    Name: u_user_left_join_likes
    Label: User LEFT JOIN Likes
    View Tables:
        - 1
            Table: u_user
            Order: 100
            Variable prefix: usr
            Where clause: 
            Left join: false
        - 2
            Table: u_likes
            Order: 200
            Variable prefix: lks
            Where clause: usr_sys_id=lks_u_user
            Left join: true
*/

//Example 1 - Users that like Tennis and Movies
var grTableA = new GlideRecord('u_user');
var grJoin = grTableA.addJoinQuery('u_user_left_join_likes','sys_id','usr_sys_id');
grJoin.addCondition('lks_u_activity','Tennis');
grJoin.addOrCondition('lks_u_activity','Movies');
grTableA.query();
while(grTableA.next()) {
	gs.info('Name: ' + grTableA.getValue('u_name'));
}

/*
Output:

Name: Maria
Name: Darwin
*/

//Example 2 - Users called Patrik or that like Movies
var grTableA = new GlideRecord('u_user');
var grJoin = grTableA.addJoinQuery('u_user_left_join_likes','sys_id','usr_sys_id');
grJoin.addCondition('lks_u_activity','Movies');
grJoin.addOrCondition('usr_u_name','Patrik');
grTableA.query();
while(grTableA.next()) {
	gs.info('Name: ' + grTableA.getValue('u_name'));
}

/*
Output:

Name: Patrik
Name: Maria
*/

//Example 3 - Incidents with Priority 1 - Critical or SLA In Progress
var grIncident = new GlideRecord('incident');
var grJoin = grIncident.addJoinQuery('incident_sla','sys_id','inc_sys_id');
grJoin.addCondition('taskslatable_stage','in_progress');
grJoin.addOrCondition('inc_priority','1');
grIncident.query();
while(grIncident.next()) {
	gs.info('Number: ' + grIncident.getValue('number'));
}

/*
Note this wont work on the OOB incident_sla database view. You need to create a new one or make the following modifications:

Table Views:
    - 1
        Table: incident
        Order: 100
        Variable prefix: inc
        Where clause: 
        Left join: false
    - 2
        Table: task_sla
        Order: 200
        Variable prefix: taskslatable
        Where clause: inc_sys_id=taskslatable_task
        Left join: true
*/