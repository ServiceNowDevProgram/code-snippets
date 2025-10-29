(function executeRule(current, previous /*null when async*/) {
    var now = new GlideDateTime();

    var daySchedule = new GlideSchedule('46d3f0b1dbf01300a6a5f0b1dbf01300'); // Day Schedule
    var nightSchedule = new GlideSchedule('56e4f0b1dbf01300a6a5f0b1dbf01300'); // Night Schedule

    if (daySchedule.isInSchedule(now)) {
        current.assignment_group = '76f5f0b1dbf01300a6a5f0b1dbf01300'; // Day Support Group
    } else if (nightSchedule.isInSchedule(now)) {
        current.assignment_group = '86g6f0b1dbf01300a6a5f0b1dbf01300'; // Night Support Group
    } else {
        current.assignment_group = 'f2c9980bf9bc3a10f9182b07f0f0832a'; // Optional fallback
    }
})();
