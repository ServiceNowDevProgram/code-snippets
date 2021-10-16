//Slack unfurl sections and image in processor

var name= g_request.getParameter("u");

var title = "<meta property='og:title' content='SwiftKey Keyboard for iPhone, iPad &amp;amp; iPod Touch'/>";
var desc = "<meta property='og:description' content='Discover the best new app for iPhone and iPad, SwiftKey Keyboard learns from you for faster, easier mobile typing — free.'/>";
var img = "<meta property='og:image' content='https://sndevs.com/wp-content/uploads/2017/03/sndevs-1.jpg?slackwarehouse' />";
	
g_processor.writeOutput("text/plain",title);
g_processor.writeOutput("text/plain",desc);
g_processor.writeOutput("text/plain",img);
	
g_processor.writeOutput("text/plain","Hello "+name);
