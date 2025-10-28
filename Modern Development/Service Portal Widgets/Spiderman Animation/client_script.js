api.controller=function() {
	/* widget controller */
	var c = this;
	  var sound=new Audio('spider.mp3');
	  sound.play();
	  setTimeout( function() {
		  var ele = document.querySelector('.spidey')
		  ele.style.animationPlayState = 'paused'
	  }, 8500);
  };