function getNextMonday() {
    var dayOfWeek = new GlideDateTime().getDayOfWeek();
    var nextMonday = (8 - dayOfWeek) % 7 + 1; // Calculate days until next Monday
    var date = new GlideDateTime().addDaysLocalTime(nextMonday);
    gs.info("The next upcoming Monday is on " + date.getDate() + ", in " + nextMonday + " days.");
    return date.getDate();
}
