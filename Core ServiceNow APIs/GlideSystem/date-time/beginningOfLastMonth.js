// get the current date and time in the logged in user's time zone
gs.info(new GlideDateTime().getDisplayValue());
// show the beginning of last month's date and time in the logged in user's time zone
gs.info(gs.beginningOfLastMonth());

// output
// x_scope_app: 2021-10-01 15:50:40
// x_scope_app: 2021-09-01 05:00:00
