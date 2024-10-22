// Business Rule that runs when any update or specific field update is performed
(function executeRule(current, previous /*null when async*/ ) {

    // Add your code here
    var copy = new GlideRecord('problem');
    copy.addQuery('parent', current.getUniqueValue());
    copy.query();
    if (copy.next()) {
        GlideSysAttachment.copy('incident', current.getUniqueValue(), 'problem', copy.getUniqueValue()); // Copy from incident to problem, it can be copied from any table to any table
    }
})(current, previous);
