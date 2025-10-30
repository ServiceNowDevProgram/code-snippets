var srcFav = ""; // Add the sys_id of the favourite to copy, from sys_ui_bookmark table
var portalFav = ""; // Add the sys_id of the favourite to copy, from sp_favorite table.
var userCriteria = ""; // Add an encoded query of users from sys_user table
var fav = new GlideRecord("sys_ui_bookmark");
fav.get(srcFav);

var portalFavRec = new GlideRecord("sp_favorite");
portalFavRec.get(portalFav);  // glide record of favorite record.

var users = new GlideRecord("sys_user");
users.addEncodedQuery(userCriteria);
users.query();
while(users.next()) {
  var newFav = new GlideRecord("sys_ui_bookmark");
  newFav.initialize();
  newFav.setValue("color",fav.color);
  newFav.setValue("icon",fav.icon);
  newFav.setValue("order",999999999); //this might need to be changed per individual requirements, otherwise this value should probably put it to the bottom of the list
  newFav.setValue("pinned",true);
  newFav.setValue("title",fav.title);
  newFav.setValue("url",fav.url);
  newFav.setValue("user",users.sys_id);
  newFav.insert();

  createPortalFav(users); // function to create portal favorites
}
function createPortalFav(userRec){
  var newPortalFav = new GlideRecord("sp_favorite");
  newPortalFav.initialize();
  newPortalFav.setValue('user',userRec.user);
  newPortalFav.setValue('reference_table',portalFavRec.reference_table);
  newPortalFav.setValue('reference_document',portalFavRec.reference_document);
  newPortalFav.setWorkflow(false); // OOB Sscript include take the logged-in user to check the duplicate records so workflow false restricts the SI to run.
  newPortalFav.insert();
}



