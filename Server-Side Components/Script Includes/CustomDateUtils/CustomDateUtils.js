var CustomDateUtils = Class.create();
CustomDateUtils.prototype = {
    initialize: function() {},

    sortArrayOfDateStrings: function(dates) {
        dates.sort(function(d1, d2) {
            var gdt1 = new GlideDate();
            gdt1.setValue(d1);
            var gdt2 = new GlideDate();
            gdt2.setValue(d2);
            if (gdt1.getValue() < gdt2.getValue())
                return -1;
            else if (gdt1.getValue() >= gdt2.getValue())
                return 1;
        });
        return dates;
    },

    sortArrayOfDateStringsDesc: function(dates) {
        dates.sort(function(d1, d2) {
            var gdt1 = new GlideDate();
            gdt1.setValue(d1);
            var gdt2 = new GlideDate();
            gdt2.setValue(d2);
            if (gdt1.getValue() < gdt2.getValue())
                return 1;
            else if (gdt1.getValue() >= gdt2.getValue())
                return -1;
        });
        return dates;
    },

    sortArrayOfDates: function(dates) {
        dates.sort(function(d1, d2) {
            if (d1 < d2)
                return -1;
            else if (d1 >= d2)
                return 1;
        });
        return dates;
    },

    sortArrayOfDatesDesc: function(dates) {
        dates.sort(function(d1, d2) {
            if (d1 < d2)
                return 1;
            else if (d1 >= d2)
                return -1;
        });
        return dates;
    },

    type: 'CustomDateUtils'
};