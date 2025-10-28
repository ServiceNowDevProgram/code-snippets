api.controller=function($scope) {
/* widget controller */
var c = this;
 c.add =function(){
  c.data.action = "add";
  c.server.update().then(function(){
    c.data.action = undefined;
	  c.data.newColor ="";
    c.data.text = "";
  })
 }
 c.remove =function(i){
  c.data.i =i;
  c.data.action = "remove";
  c.server.update().then(function(){
    c.data.action = undefined;
  })
 }
}
