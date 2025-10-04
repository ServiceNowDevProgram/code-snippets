var Str = "Element1,Element2,Element3,Element4,Element5,Element6";
result =[];
var myArray = Str.split(",");
for(var i =0; i<=myArray.length;i++){
result.push(myArray[i]);
}
var output= "\n" +result.join("\n");
gs.info(output);
