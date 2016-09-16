var CryptoJS = require("crypto-js");
 
// Encrypt 
var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
 
// Decrypt 
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
var plaintext = bytes.toString(CryptoJS.enc.Utf8);
 
console.log(plaintext);


var data = [{id: 1}, {id: 2}]
 
// Encrypt 
ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');
 
// Decrypt 
bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
 
console.log(JSON.stringify(decryptedData));