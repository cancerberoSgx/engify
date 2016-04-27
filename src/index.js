/*
Usage: 

	node build --input my/src/index.js > my/output.js

node build --input src/index.js > output.ss
*/

var shell = require('shelljs')
var fs = require('fs')
var browserify = require('browserify')

,	args = require('yargs').argv


shell.config.silent = true;

var main = args['input']
,	target = args['output']

shell.rm('-rf', target)


var b = browserify(main).bundle(); 
readStream(b, function(error, buffer)
{
	if(target)
	{
		(shell.cat(__dirname + '/assets/prefix.js') + '; ' + buffer).to(target); 
	}
	else
	{
		console.log(shell.cat(__dirname + '/assets/prefix.js') + '; ' + buffer)
	}
}); 




//utilities 
function readStream(stream, fn)
{
	var buffers = [];
	stream.on('data', function(buffer) 
	{
		buffers.push(buffer);
	});
	stream.on('error', function(error) 
	{
		fn(error)
	});
	stream.on('end', function() 
	{
		var buffer = Buffer.concat(buffers);
		fn(null, buffer)
	})
}
