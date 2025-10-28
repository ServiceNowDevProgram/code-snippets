function onLoad() {
    //Type appropriate comment here, and begin script below
	
	//Get element of the field
    var requestedForLabel = $('element.sc_req_item.request.requested_for');
	var company = g_scratchpad.company;

	//Set the Position of the image
	var bgPosition = "5% 45%";
	
	var image = '';
	
	//Set the image based on the Company
	switch (company) {
            case 'company 1':
                image = 'url(company1.png)';
                break;
            case 'company 2':
                image = 'url(company2.png)';
                break;
            case 'company 3':
                image = 'url(company3.png)';
                break;
            default:
                image = '';
        }
	
	//Update the Field Label
    requestedForLabel.down('label').setStyle({
        backgroundImage: image,
        backgroundRepeat: "no-repeat",
        backgroundPosition: bgPosition,
        paddingLeft: '30px'
    });

}
