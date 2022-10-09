 CompareDates: function() {
        try {

            var st = this.getParameter('sysparm_st'); // new 
            var en = this.getParameter('sysparm_en'); //old

            var start = new GlideDateTime();
            start.setDisplayValue(st);
            var end = new GlideDateTime();
            end.setDisplayValue(en);

            if (end == start) {
                return false;
            } else {
                return true;
            }
        } catch (ex) {
            gs.info('Exception in Compare Dates ' + ex);
        }

    },
