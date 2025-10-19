(function executeRule(current, previous /*null when async*/ ) {
    /*
    table: sp_widget
    when: Before
    operation: insert & update
    condition : Body HTML Template Changes.
    This BR will check if standard internationalisation is not followed, this is required for multi lingual portals and is flagged in health scan.
    */
    var reg = />([a-zA-Z].*)<\//; // regex to check if strings are directly added in HTML Template
    var regex = new RegExp(reg);
    if (regex.test(current.getValue('template'))) {
        gs.addInfoMessage("Please use standard inernationalisation methods for strings like ${string} or define the string in server using gs.getMessage('string')");
        current.setAbortAction(true);
    }

})(current, previous);
