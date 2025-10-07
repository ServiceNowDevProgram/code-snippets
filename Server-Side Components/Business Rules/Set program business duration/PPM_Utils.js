/***
     * getProgramDate      - Finds min/max planned start for a program from child projects and program tasks and sets planned start/end on program
     *
     * @param recordGr     - gliderecord for passed in record that has link to a program
     * @param pgmGetField  - the field that relates recordGr to a program
     * @return             - NA
     ***/
    setProgramDates: function(recordGr, pgmGetField) {

        var updated = false;
        var pgmGr = new GlideRecord('pm_program');
        pgmGr.get(recordGr.getValue(pgmGetField));

        // find out of the program has child records that set it's planned start/end dates
        if (pgmGr.getValue('sys_class_name') == 'pm_program') {
            var children = this._isProgramChildren(pgmGr.getValue('sys_id'));
        }

        // find the minimum start date for the program
        var minDate = this._getProgramDate(pgmGr.getValue('sys_id'), 'start_date');
        if (minDate.compareTo(pgmGr.getDisplayValue('start_date')) != 0) { // the new task date is different to current program start
            pgmGr.setDisplayValue('start_date', minDate);
            updated = true;
        }

        // if it has changed then check if it is the lowest program date
        var maxDate = this._getProgramDate(pgmGr.getValue('sys_id'), 'end_date');
        if (maxDate.compareTo(pgmGr.getDisplayValue('end_date')) != 0) { // the new project end date is different to current program end date
            pgmGr.setDisplayValue('end_date', maxDate);
            updated = true;
        }

        // if min or max date has changed then update the program record
        if (updated) {
            // if the dates have changed, re-calculate the business duration and update program record
            var pgmBusDuration = this._getBusinessDuration(pgmGr.start_date, pgmGr.end_date);
            if (pgmBusDuration) {
                pgmGr.business_duration = pgmBusDuration;
            }
            pgmGr.update();
        }
    },

/***
     * _getProgramDate - gets either min or max start/end date for a program
     *
     * @param pgmSysId - sys_id of a program record
     * @param orderBy  - the field on the planned task table you want to order the records by - must be a date/time field
     * @return         - glide date time of the order by field
     ***/
    _getProgramDate: function(pgmSysId, orderBy) {
        var taskGr = new GlideRecord('planned_task');
        taskGr.addEncodedQuery('sys_class_name=pm_project^ORsys_class_name=pm_program_task^parent=' + pgmSysId + '^ORtop_program=' + pgmSysId);
        if (orderBy == 'start_date') {
            taskGr.orderBy(orderBy);
        } else taskGr.orderByDesc(orderBy);
        taskGr.setLimit(1);
        taskGr.query();
        if (taskGr.next()) {
            return taskGr.getDisplayValue(orderBy);
        }
    }, 
      
 /***
     * _isProgramChildren - returns true if a program has child projects or program tasks
     *
     * @param programId - sys id of a program record
     * @return          - duration in date time format from 1970
     ***/
    _isProgramChildren: function(programId) {

        var taskGr = new GlideRecord('planned_task');
        taskGr.getEncodedQuery('sys_class_name=pm_project^ORsys_class_name=pm_program_task^top_program=' + programId);
        taskGr.setLimit(1);
        taskGr.query();
        if (taskGr.next()) {
            return true;
        } else return false;

    },     
      
    /***
     * _getBusinessDuration - uses min/max program dates to calculate business duration of a record
     *
     * @param startDate - date in glide date time format
     * @param endDate   - date in glide date time format
     * @return          - duration in date time format from 1970
     ***/
    _getBusinessDuration: function(startDate, endDate) {

        var start = startDate.toString();
        var end = endDate.toString();

        /*excluding weekends date diff calculations*/
        var dc = new DurationCalculator();
        var sched = gs.getProperty('sn_hr_core.schedule_8_to_5_weekdays');
        dc.setSchedule(sched);

        // get the duration
        var dur = Number(dc.calcScheduleDuration(start, end));
        dur = Math.round(dur / 60 / 60 / 9);

        // convert duration into days
        var totalSeconds = dur * 86400;
        var durationInMs = totalSeconds * 1000;
        var gDuration = new GlideDuration(durationInMs);

        return gDuration.getDurationValue();
    },      
