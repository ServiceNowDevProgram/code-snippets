//This schedule job will Execute daily 
var hrProf = new GlideRecord('sn_hr_core_profile');
hrProf.addQuery('user.active', true);   
var diff = [];
hrProf.query();
while (hrProf.next()) {
 var start = new GlideDateTime(hrProf.probation_date);
    var currentDate = new GlideDateTime();
    var gdt2 = new GlideDateTime(currentDate.getDisplayValue());
    diff = GlideDateTime.subtract(gdt2, start);
    var res = diff.getDisplayValue().toString();
    var days = res.substring(0, 2);
    var datediff = diff.getNumericValue();
    var dateDifferenceInDays = Math.floor(datediff / (1000 * 60 * 60 * 24));
      if (dateDifferenceInDays == "30") {
            var hrCase = new GlideRecord("sn_hr_le_case");
            hrCase.initialize();
            hrCase.hr_service = gs.getProperty("Probation HR Service"); //Probation HR Service
            hrCase.opened_for = hrProf.user.manager; // Manager of the user
            hrCase.subject_person = hrProf.user;
            hrCase.opened_by = hrProf.user.manager;
            hrCase.state = '10';
            hrCase.short_description = "Probation HR Case for " + hrProf.user.getDisplayValue();
            hrCase.insert();
            
        }
}

