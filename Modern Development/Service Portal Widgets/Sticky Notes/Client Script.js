api.controller=function($scope) {
/* widget controller */
var c = this;
c.add =function(){
c.data.action = "addMessage";
c.server.update().then(function(){
c.data.action = undefined;
	c.data.newColor ="";
c.data.message = "";
})
}
c.remove =function(i){
c.data.i =i;
c.data.action = "removeMessage";
c.server.update().then(function(){
c.data.action = undefined;
})

}
}
