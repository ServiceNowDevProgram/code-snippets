//Here we have 2 Script includes Parent and child,

//***********************Parent script include*****************************************

var Parent_Script_include = Class.create();
Parent_Script_include.prototype = {

    initialize: function() {},

    addition: function(c1, c2) {
        return c1 + c2;

    },
    type: 'Parent_Script_include'
};

// ******************Child Script Include******************************************

var call_Extended_Class = Class.create();	
	call_Extended_Class.prototype = Object.extendsObject(Parent_Script_include, {
    type: 'call_Extended_Class'
});

// ********************BackgroundScript***************
//Call the Script Include
var sc1 = new Parent_Script_include();
var sc2 = new call_Extended_Class();
gs.info(sc2.addition(5,10));

// Output = 15
