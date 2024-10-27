(function executeRule(current, previous /*null when async*/) {
    /**
     * eventQueue() - 
     *   This method inserts an specified event in an event queue
     * Event name. Enclose the event name in quotes.
     * GlideRecord object, typically current but can be any GlideRecord object from the event's table.
     * Any value that resolves to a string. This is known as parm1 (Parameter 1). Can be a string, variable that resolves to a string, or method that resolves to a string.
     * Any value that resolves to a string. This is known as parm2 (Parameter 2). Can be a string, variable that resolves to a string, or method that resolves to a string.
     * (Optional) GlideDateTime object or a date/time type element that specifies the date and time to process the event.
     */
    var processTime = new GlideDateTime();
    processTime.add(5*60*60); //trigger event after 5 mins

	gs.eventQueueScheduled("task_assigned",current,gs.getUserName(),gs.getUserDisplayName(),processTime);

})(current, previous);