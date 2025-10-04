/** 
* Hexadecimal color pattern. The following formats are allowed:
* #ABC | #AB1 | #123
* #ABCDEF | #ABC123 | #123456 
*/
const hexColorRegex = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g;

const colorCode = "#ABC123";

if (hexColorRegex.test(colorCode)) {
  gs.info("Valid hexadecimal color");
} 
else {
  gs.info("Invalid hexadecimal color");
}
