var user_lang = gs.getUser().getPreference('user.language');
var grlocal = new GlideLocale(user_lang);
var number = 98774433.789;
var formattedNumber = grlocal.getGroupingSeparator() + grlocal.getDecimalSeparator();
gs.info(formattedNumber);
