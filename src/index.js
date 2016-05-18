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





//I'm a browserify transformation. Based on https://github.com/jnordberg/coffeeify/blob/master/index.js
// npm install --save convert-source-map through2
var convert = require('convert-source-map');
var path = require('path');
var through = require('through2');



function compile(filename, source, options, callback) 
{
    var compiled;
    // console.log('compile ', filename)
    var compiled = source;
    callback(null, compiled + '\n');
}

function engify(filename, options) 
{
	// console.log('engify', filename)

    if (typeof options === 'undefined' || options === null) options = {};

    var compileOptions = 
    {
    };

    var chunks = [];
    function transform(chunk, encoding, callback) 
    {
        chunks.push(chunk);
        callback();
    }

    function flush(callback) {
        var stream = this;
        var source = Buffer.concat(chunks).toString();
        compile(filename, source, compileOptions, function(error, result) 
        {
            if (!error) stream.push(result);
            callback(error);
        });
    }

    return through(transform, flush);
}

engify.compile = compile;

module.exports = engify;