var v = new GlideJsonPath('{"lib":{"jsonpath":{"cricket":{"name":"India","players":["Rohit sharma","Dhoni","Kholi"]}}}}'); 
var l = v.read("$['lib']['jsonpath']['cricket']['players'][*]");

