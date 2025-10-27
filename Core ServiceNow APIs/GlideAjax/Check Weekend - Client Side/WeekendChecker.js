//Script Include
var DateUtilityAjax = Class.create();
DateUtilityAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {
//Returns true if the current server date is a weekend
    isWeekend: function() {
        var gdt = new GlideDateTime();
        var dayOfWeek = gdt.getDayOfWeekLocalTime(); // Sunday = 1, Monday = 2, ..., Saturday = 7 in Servicenow
        return (dayOfWeek === 1 || dayOfWeek === 7);
    },
  
    type: 'DateUtilityAjax'
});
