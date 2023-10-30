        var queryString;
        var getPropertyValue = new GlideRecord('sys_properties');
        getPropertyValue.addQuery('name', '<name of your property which contains parameters of sensitive data mainnly GDPR>'); "Example : BSN,Burgerservicenummer,voornaam,achternaam,geslacht,gender,Geboortedatum,Birth,adres,woonplaats,straatnaam,huisnummer,postcode,telefoonnummer,mobiel,hypotheeknummer,IBAN,Rekeningnummer,Rekeningnr,Rek. nr.,Verzekeringsnummer,verzekeringsnr,wachtwoord,gebruikersnaam,username,password,pwd"
        getPropertyValue.query();
        if (getPropertyValue.next()) {
            queryString = getPropertyValue.value.toString();
        }

        var queryStringArray = queryString.split(',');
        var arrayTasks = [];

        var query = '';
        for (var i = 0; i < queryStringArray.length; i++) {
            if (i == 0) {
                query = 'short_descriptionLIKE' + queryStringArray[0] + '^ORwork_notesLIKE' + queryStringArray[0] + '^ORdescriptionLIKE' + queryStringArray[0];
            } else {
                query = query + '^ORshort_descriptionLIKE' + queryStringArray[i] + '^ORwork_notesLIKE' + queryStringArray[i] + '^ORdescriptionLIKE' + queryStringArray[i];
            }
        }

        grTask = new GlideRecord('task');
        grTask.addEncodedQuery(query);
        grTask.query();
        while (grTask.next()) {
            arrayTasks.push(grTask.sys_id.toString());
        }

        return arrayTasks;
