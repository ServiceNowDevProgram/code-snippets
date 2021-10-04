var ClientDateTimeUtils = Class.create();
ClientDateTimeUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    //Takes a Single Date/Time Field and returns its time difference from nowDateTime().
    //params = sysparm_fdt (the first date/time field), sysparm_difftype (time based format to return result. See "_calcDateDiff" function comments)
    getNowDateTimeDiff: function () {
        var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field
        var diffTYPE = this.getParameter('sysparm_difftype'); // Date-Time Type to return the answer as. Can be second, minute, hour, day
        var diff = gs.dateDiff(gs.nowDateTime(), firstDT, true);
        var timediff = this._calcDateDiff(diffTYPE, diff);
        //return "getNowDateTimeDiff: FIRST DT: " + firstDT + " -DIFFTYPE: " + diffTYPE + " -TIME DIFF: " + timediff;
        return timediff;
    },

    //Diff the amount of time between two different Date/Time fields
    //params = sysparm_fdt (the first date/time field), sysparm_sdt (second date/time field), sysparm_difftype (time based format to return result. See "_calcDateDiff" function comments)
    getDateTimeDiff: function () {
        var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field
        var secondDT = this.getParameter('sysparm_sdt'); // Second Date-Time Field
        var diffTYPE = this.getParameter('sysparm_difftype'); // Date-Time Type to return the answer as. Can be second, minute, hour, day
        var diff = gs.dateDiff(firstDT, secondDT, true);
        var timediff = this._calcDateDiff(diffTYPE, diff);
        //return "getDateTimeDiff: FIRST DT: " + firstDT + " -SECOND DT: " + secondDT + " -DIFFTYPE: " + diffTYPE + " -TIME DIFF: " + timediff;
        return timediff;
    },

    //Takes your date/time field and returns the amount of time before now. A positive is time before now, a negative number is after now.
    //params = sysparm_fdt (the first date/time field), sysparm_difftype (time based format to return result. See "_calcDateDiff" function comments)
    getDateTimeBeforeNow: function () {
        var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field
        var diffTYPE = this.getParameter('sysparm_difftype'); // Date-Time Type to return the answer as. Can be second, minute, hour, day
        var diff = gs.dateDiff(firstDT, gs.nowDateTime(), true);
        var timediff = this._calcDateDiff(diffTYPE, diff);
        //return "getDateTimeBeforeNow: FIRST DT: " + firstDT + " -DIFFTYPE: " + diffTYPE + " -TIME DIFF: " + timediff;
        return timediff;
    },

    //Returns true if it is before now, and false if it is after now.
    //params = sysparm_fdt (the first date/time field)
    getDateTimeBeforeNowBool: function () {
        var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field
        var diff = gs.dateDiff(firstDT, gs.nowDateTime(), true);
        var answer = '';
        if (diff >= 0) {
            answer = 'true';
        } else {
            answer = 'false';
        }
        return answer;
    },

    //Returns the Date/Time of right now.
    getNowDateTime: function () {
        var now = gs.nowDateTime(); //Now Date/Time
        return now;
    },

    //Returns the Date right now.
    getNowDate: function () {
        var now = GlideDate();; //Now Date
        return now.getLocalDate();
    },

    //Returns the Time of right now.
    getNowTime: function () {
        var now = GlideTime();; //Now Time
        var modnow = now.getLocalTime().toString().split(' ');
        return modnow[1];
    },

    //Takes a date/time field and adds time to it.
    //params = sysparm_fdt (the first date/time field), sysparm_addtype (type of time to add - second, minute, hour, day, week, month, year), sysparm_addtime (amount of time to add based on the type).
    addDateTimeAmount: function () {
        var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field
        var addTYPE = this.getParameter('sysparm_addtype'); //What to add - second (addSeconds()), minute (need to add conversion), hour (need to add conversion), day (addDays()), week (addWeeks()), month (addMonths()), year (addYears())
        var addTIME = this.getParameter('sysparm_addtime'); //How much time to add
        var day = GlideDateTime(firstDT);

        if (addTYPE == 'second') {
            day.addSeconds(addTIME);
        } else if (addTYPE == 'minute') {
            day.addSeconds(addTIME * 60);
        } else if (addTYPE == 'hour') {
            day.addSeconds(addTIME * (60 * 60));
        } else if (addTYPE == 'day') {
            day.addDays(addTIME);
        } else if (addTYPE == 'week') {
            day.addWeeks(addTIME);
        } else if (addTYPE == 'month') {
            day.addMonths(addTIME);
        } else if (addTYPE == 'year') {
            day.addYears(addTIME);
        } else {
            day.addDays(addTIME);
        }

        //return "First Date: " + firstDT + " -Time to Add: " + addTIME + " -Add Type: " + addTYPE + " -Added Time: " + day;
        return day;
    },

    //Takes a glide date field and adds time to it.
    //params = sysparm_fdt (the first date/time field), sysparm_addtype (type of time to add - day, week, month, year),sysparm_addtime (amount of time to add based on the type).
    addDateAmount: function () {
        var firstDT = this.getParameter('sysparm_fdt'); //First Date Field
        var addTYPE = this.getParameter('sysparm_addtype'); //What to add - day (addDays()), week (addWeeks()), month (addMonths()), year (addYears())
        var addTIME = this.getParameter('sysparm_addtime'); //How much time to add
        var day = GlideDate();
        day.setValue(firstDT);

        if (addTYPE == 'day') {
            day.addDays(addTIME);
        } else if (addTYPE == 'week') {
            day.addWeeks(addTIME);
        } else if (addTYPE == 'month') {
            day.addMonths(addTIME);
        } else if (addTYPE == 'year') {
            day.addYears(addTIME);
        } else {
            day.addDays(addTIME);
        }

        //return "First Date: " + firstDT + " -Time to Add: " + addTIME + " -Add Type: " + addTYPE + " -Added Time: " + day;
        return day;
    },

    addTimeAmount: function () {
        var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field
        var addTYPE = this.getParameter('sysparm_addtype'); //What
        var addTIME = this.getParameter('sysparm_addtime'); //How much time to add
        var time = GlideTime();
        time.setValue(firstDT);

        if (addTYPE == 'second') {
            time.addSeconds(addTIME);
        } else if (addTYPE == 'minute') {
            time.addSeconds(addTIME * 60);
        } else if (addTYPE == 'hour') {
            time.addSeconds(addTIME * (60 * 60));
        } else {
            time.addSeconds(addTIME);
        }

        var modtime = time.toString().split(' ');
        //return "First Date: " + firstDT + " -Time to Add: " + addTIME + " -Add Type: " + addTYPE + " -Added Time: " + time;
        return modtime[1];
    },

    //Private function to calculate the date difference return result in second, minute, hour, day.
    _calcDateDiff: function (diffTYPE, seconds) {
        var thisdiff;
        if (diffTYPE == "day") {
            thisdiff = seconds / 86400;
        } else if (diffTYPE == "hour") {
            thisdiff = seconds / 3600;
        } else if (diffTYPE == "minute") {
            thisdiff = seconds / 60;
        } else if (diffTYPE == "second") {
            thisdiff = seconds;
        } else {
            thisdiff = seconds;
        }
        return thisdiff;
    }
});
