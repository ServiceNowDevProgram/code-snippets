function generateRandomPassword(passLenght) {
	var length = passLenght;
	var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var numbers = '0123456789';
	var symbols = '!#$%&\()*+,-./:;<=>?@^[\\]^_`{|}~';

	var validChars = '';
	validChars += letters;
	validChars += numbers;
	validChars += symbols;

	var generatedPassword = '';

	for (var i = 0; i < length; i++) {
		var index = Math.floor(Math.random() * validChars.length);
		generatedPassword += validChars[index];
	}
	return generatedPassword;
}