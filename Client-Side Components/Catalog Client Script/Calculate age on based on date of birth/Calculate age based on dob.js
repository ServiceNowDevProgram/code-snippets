function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
       return;
    }
 
 function calculateAge(dateOfBirth) {
     if (!dateOfBirth || isNaN(Date.parse(dateOfBirth))) {
         alert('Invalid date of birth provided.');
         return;
     }
     var dob = new Date(dateOfBirth);
     var currentDate = new Date();
     var age = calculateAgeDifference(dob, currentDate);
     var ageString = '';
 
     if (age.years > 0) {
         ageString += age.years + ' years';
         if (age.months > 0 || age.days > 0) {
             ageString += ', ';
         }
     }
 
     if (age.months > 0) {
         ageString += age.months + ' months';
         if (age.days > 0) {
             ageString += ', ';
         }
     }
 
     if (age.days > 0) {
         ageString += age.days + ' days';
     }
      return ageString;
 }
 
 function calculateAgeDifference(startDate, endDate) {
     var years = endDate.getFullYear() - startDate.getFullYear();
     var months = endDate.getMonth() - startDate.getMonth();
     var days = endDate.getDate() - startDate.getDate();
 
     if (days < 0) {
         months--;
         days += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
     }
 
     if (months < 0) {
         years--;
         months += 12;
     }
 
     return { years: years, months: months, days: days };
 }
 
 var dateOfBirth = newValue;
 var age = calculateAge(dateOfBirth);
 g_form.setValue('age', age);
 }