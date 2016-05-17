/*
Usage: 

	node src/index.js --input test-src/index.js > my/output.js

*/

var shell = require('shelljs')
var fs = require('fs')
var browserify = require('browserify')
,	args = require('yargs').argv
,	path = require('path')


shell.config.silent = true;

var main = args['input']
,	target = args['output']

shell.rm('-rf', target)

// console.log(args.browserifyTransform, path.dirname(main), path.basename(main))
// shell.cd(path.dirname(main))

var browserifyOptions = {
	transform: args.browserifyTransform || ''
}; //{transform: 'hbsfy'}

var b = browserify(main, browserifyOptions).bundle(); 
readStream(b, function(error, buffer)
{
	if(error)
	{
		console.log('ERROR: ', error.toString())
		process.exit(1)
	}
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
