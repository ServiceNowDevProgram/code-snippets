function findNoOfDays(start, end) {

            var date1 = new GlideDateTime();
            date1.setDisplayValue(start);
            var date2 = new GlideDateTime();
            date2.setDisplayValue(end);

            var date = GlideDateTime.subtract(date1, date2);

            var total = date.getDisplayValue();
            total = date.getDayPart();

            return parseInt(total);
        }
