//Regex To match ssn formats XXXXXXXXX or XXX-XX-XXXX
var ssn = /^(?:\d{3}-\d{2}-\d{4}|\d{9})$/;
//Example Input
var input = '123-12-1234';
//Boolean variable to dictate if you want hyphens or not   
var includeHyphen = true;
//Return value to avoid multiple different returns
var retval = '';
//If it matches the format of XXXXXXXXX or XXX-XX-XXXX
if(ssn.test(input)){
    //If the result will have hyphens and input already includes them
    if (includeHyphen && input.includes('-')){
        //Hyphens are already in place
        retval = input;
    }
    //Else if the result will have hyphens and the input did not include them
    else if (includeHyphen && !(input.includes('-'))){
        //Adds hyphens in the format of an SSN i.e. XXX-XX-XXXX
        retval = input.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3");
    }
    //The returned value will not have hyphens included
    else if (!(includeHyphen)){
        //Removes all hyphens in the input
        reval = input.replace('-','');
    }
}
//Else the input is not in the form of a legal ssn 
else{
    console.log("'"+ input + "' is not a legal 9-digit SSN");
}

return retval;