var html  = '<div id="someid"><span>Hello World</span></div>'; // insert your html content
var outputString = html.replace(/<\/?[^>]+(>|$)/g, ""); // output will a string without the HTML tags
