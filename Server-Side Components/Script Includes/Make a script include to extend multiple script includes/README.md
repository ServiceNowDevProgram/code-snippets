Using Object.Assign method to make a single script include to Extend multiple script includes ExtendMutlipeScriptInclues is a script include which is extending OOTB ArrayUtil and GlideRecordUtil script includes

To test this create an object by initializing ExtendMutlipeScriptInclues and call methods of ArrayUtil and GlideRecordUtil

Example:

var emObj = new ExtendMultipleScriptIncludes(); gs.info(emObj.unique([1, 22, 22, 33, 333, 4, 4, 4, 5, 5])); //unique is a method from ArrayUtil

gs.info(emObj.getGR('incident', 'ed92e8d173d023002728660c4cf6a7bc').number); //getGR is a method from GlideRecordUtil

gs.info(emObj.sayHello()); //sayHello is a method belongs to current script include
