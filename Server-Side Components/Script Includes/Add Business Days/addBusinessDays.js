// Takes the number of days as a parameter, and the start date
//Name: addBusinessDays
//Client Callable: checked
var addBusinessDays = Class.create();
var schedule = new GlideSchedule('090eecae0a0a0b260077e1dfa71da828');
addBusinessDays.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    addDays: function() {
        var days = parseInt(this.getParameter("sysparm_days"));
        var startDate = new GlideDateTime(this.getParameter("sysparm_date").toString());       
        var sd = startDate;
        startDate = startDate.getDate();
        var time = sd.getTime().getByFormat('HH:mm:ss');
        var dur = new GlideDuration(60 * 60 * 1000 * (days * 9));
        schedule = new GlideSchedule('090eecae0a0a0b260077e1dfa71da828'); //sys_id of OOB schedule 8-5 weekdays excluding holidays
        var end = schedule.add(startDate, dur);       
        var endDate = end.getDate().getByFormat("MM/dd/yyyy");
        var endDateTime = endDate + ' ' + time;
        return endDateTime.toString();
    },
    type: 'addBusinessDays'
});
