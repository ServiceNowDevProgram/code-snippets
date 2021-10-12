Call this script include function to convert an array (key value array ) to JSON

e.g. Input Array ['name','John','age','30']

Call function like:

var inputArr =['name','John','age','30'];

var output = new customArrayUtil().arrToJSON(inputArr, true);

Output : {"name":"John","Age":"30"}
