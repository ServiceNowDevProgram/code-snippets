(function executeRule(current, previous /*null when async*/ ) {
    var search = gs.urlEncode(current.text.replace(/!xkcd/, '').trim());
    var rm = new sn_ws.RESTMessageV2();
    rm.setHttpMethod('GET');
    rm.setEndpoint('https://www.explainxkcd.com/wiki/index.php?search=' + search + '&title=Special%3ASearch&go=Go');
    rm.setRequestHeader('User-Agent', 'servicenow');
    var response = rm.execute();
    var body = response.getBody();
    var result = body.match(/(?:<a href="\/wiki\/index.php\/)[0-9]+/gm)[0].replace(/<a href="\/wiki\/index.php\//g, '');
    if (parseInt(result)) {
        var rm2 = new sn_ws.RESTMessageV2();
        rm2.setHttpMethod('GET');
        rm2.setEndpoint('https://xkcd.com/' + result + '/info.0.json');
        rm2.setRequestHeader('User-Agent', 'servicenow');
        var response2 = rm2.execute();
        var body2 = JSON.parse(response2.getBody());
        var safe_title = body2.safe_title;
        var img = body2.img;
        var alt = body2.alt;
    }
})(current, previous);
