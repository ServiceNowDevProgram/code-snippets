//This script include converts string format date (Eg: 20230418) to GlideDate Object (2023-04-18)
var getFormatDate = Class.create();
getFormatDate.prototype = {
  initialize: function() {},

  convertDate: function(inputDate){ //the input will be in 'yyyymmdd' format
    if(inputDate!=''){
      var yy = dateStr.substr(0,4);
      var mmm = dateStr.substr(4,2);
      var dd = dateStr.substr(6,2);

      var formattedDate = yy+'-'+mm+'-'+dd;
      var gdt = new GlideDate();
      gdt.setValue(formattedDate);
      return gdt;

    },
  type: 'getFormatDate'
};
    
