var fs = require('fs');
var s = fs.readFileSync('./sample-diff.patch', 'utf8');
console.log(s);