api.controller=function($scope) {
  /* widget controller */
  var c = this;
	
	c.emojiMap ={
		':smile:' :'😊',
		':sad:':'😓',
		":heart:":'❤️',
		":thumbsup:":'👍',
		":laugh:":"😀",
		":wink:":"😉",
		":clap:":"👏",
		":party:" :"🥳"
	};
	
	c.replaceEmojis = function(){
		var text = $scope.data.inputText || '';
		
		for(var key in c.emojiMap){
			var regex = new RegExp(key.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1"),'g');
			text = text.replace(regex,c.emojiMap[key]);
		}
		c.outputText= text;
	}
};
