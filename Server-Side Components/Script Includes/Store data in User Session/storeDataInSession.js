var storeDataInSession = Class.create();
storeDataInSession.prototype = {
    initialize: function() {},

    putDataInSession: function(jsData) //pass the data in json format
    {
        var session = gs.getSession();
        
            for (var j in jsData) {
                if (this.checkIfDataIsPresent(j) == 'true') {
                    this.clearSessionData(j);

                }
				
                session.putClientData(j, jsData[j]);
            }
        
        
    },
    checkIfDataIsPresent: function(key) {
        var session = gs.getSession();
        var clientData = session.getClientData(key);
        if (clientData == null || clientData == undefined)
            return 'true';
        else
            return 'false';
    },
    clearSessionData: function(key) {
        var session = gs.getSession();
        session.clearClientData(key);
    },

    type: 'storeDataInSession'
};
