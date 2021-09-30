/*
Usage:  gs.addInfoMessage(StarterPackClassless(current.sys_id);

Classless Script Includes only have one function and that function name MUST match the name of the Script Include.
*/

function StarterPackClassless(userId) {
    var answer;
    if (userId == '6816f79cc0a8016401c5a33be04be441') { //Default admin account sys_id
        answer = 'You are the default system admin';
    } else {
        answer = 'You are NOT the default system admin';
    }
    return answer;
}
