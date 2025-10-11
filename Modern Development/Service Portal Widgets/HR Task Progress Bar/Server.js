(function() {
    data.state = '';
    data.taskArr = []; // array to return HR task fields
    var recordId = $sp.getParameter('sys_id'); // get sys_id of HR case from URL
    var getTask = new GlideRecord('sn_hr_core_task');
    getTask.addEncodedQuery('parent=' + recordId); // encoded Query to get all task related to HR case
    getTask.query();
    while (getTask.next()) {
        var obj = {}; // object to store HR task values as JSON
        obj.number = getTask.getValue('number'); // add HR task number
        obj.state = getTask.getValue('state');  // add HR task state
        obj.sys_id = getTask.getValue('sys_id'); // add HR task sys_id
        data.taskArr.push(obj);
    }
})();
