 monthCalculator: function() {

        var date = this.getParameter('date');
        var dateMonth = {};
        var month;

        var gdt = new GlideDateTime(date);
        //gs.info("Month" + gdt.getMonthUTC());
        switch (gdt.getMonthLocalTime()) {
            case 1:
                month = "JAN";

                break;
            case 2:
                month = "FEB";

                break;
            case 3:
                month = "MAR";

                break;
            case 4:
                month = "APR";

                break;
            case 5:
                month = "MAY";

                break;
            case 6:
                month = "JUN";
                break;
            case 7:
                month = "JUL";
                break;
            case 8:
                month = "AUG";
                break;
            case 9:
                month = "SEP";
                break;
            case 10:
                month = "OCT";
                break;
            case 11:
                month = "NOV";
                break;
            case 12:
                month = "DEC";
                break;

        }
        dateMonth.month = month;
        dateMonth.endDate = this.weekEndCalc(date);
        return JSON.stringify(dateMonth);
    }
