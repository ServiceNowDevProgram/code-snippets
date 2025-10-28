	// Add your code here

	var length = 18; // you can use length as option or static
	var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var numbers = '0123456789';
	var symbols = '!#$%&\()*+,-./:;<=>?@^[\\]^_`{|}~';

	var password = '';

	var validChars = '';


	validChars += letters;
	validChars += numbers;
	validChars += symbols;

	var generatedPassword = '';

	for (var i = 0; i < length; i++) {
		var index = Math.floor(Math.random() * validChars.length);
		generatedPassword += validChars[index];
	}

	password = generatedPassword;
gs.info(password);
