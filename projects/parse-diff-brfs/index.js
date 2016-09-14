var fs = require('fs');
var diff = fs.readFileSync('./sample-diff.patch', 'utf8');
// console.log(diff);


var parse = require('parse-diff');
// var diff = ''; // input diff string 
var files = parse(diff);
console.log(files.length); // number of patched files 
files.forEach(function(file) {
	// console.log(JSON.stringify(file))
    // console.log(file.chunks.length); // number of hunks 
    // console.log(file.chunks[0].changes.length) // hunk added/deleted/context lines 
    // // each item in changes is a string 
    // console.log(file.deletions); // number of deletions in the patch 
    // console.log(file.additions); // number of additions in the patch 
});

