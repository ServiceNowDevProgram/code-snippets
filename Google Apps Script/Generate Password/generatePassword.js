module.exports.generatePassword = (length) => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678$%!@#&*9";
  for (let i = 0; i < Math.min(length, 22); i++)  text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
