(function() {

    // RegEx using a Negative Lookahead 
    var re = /^(?!(([A-Fa-f0-9]{2}[:-]){5}[A-Fa-f0-9]{2})$).*/;
    var macAddresses = ['AE:FE:AA:CD:AF:0X', 'AE:FE:AA:CD:AF:02', 'Blah Blah'];

    for (var i in macAddresses) {
        if (re.test(macAddresses[i])) {
            gs.debug('MAC address ' + macAddresses[i] + ' does NOT have a valid format');
        }
    }

})();
