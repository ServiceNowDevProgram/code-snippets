var util = new global.UpdateSetUtilCustom();
var message = util.fixScopeBatch(current);
gs.addInfoMessage(message);
action.setRedirectURL(current);
