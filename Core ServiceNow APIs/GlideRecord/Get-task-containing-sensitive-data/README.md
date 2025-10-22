This script is used to get all task records based on sensitive data entered into this task based records. To make it simple to add the criteria for GDPR or sentive data i 
have created a property and used it in this line : getProperty.addQuery('name', 'nn.criticalDataPhrases');

Example: 
Property name : criteria.gdpr
Value: BSN,Burgerservicenummer,voornaam,achternaam,geslacht,gender,Geboortedatum,Birth,adres,woonplaats,straatnaam,huisnummer,postcode,telefoonnummer,mobiel,hypotheeknummer,IBAN,Rekeningnummer,Rekeningnr,Rek. nr.,Verzekeringsnummer,verzekeringsnr,wachtwoord,gebruikersnaam,username,password,pwd

Output:
Task sys_ids which contains GDPR data.

Usage:
In scripted reports, in script includes,etc.
