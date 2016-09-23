var fs = require('fs')


//do uglify

var esprima = require('esprima'), 
escodegen = require('escodegen');

function doUglify(s)
{
    var ast = esprima.parse(s+'');
    return escodegen.generate(ast, {format: escodegen.FORMAT_MINIFY}) || s;
}

// function doUglify(s){return s;}

function getPrefix()
{
    return doUglify(fs.readFileSync(__dirname + '/assets/prefix.js')) + '; ';
}



// This is a browserify transformation. Based on https://github.com/jnordberg/coffeeify/blob/master/index.js
// var convert = require('convert-source-map');
var through = require('through2');

var onlyFirst = false; 
function engify(filename, options) 
{
    if (typeof options === 'undefined' || options === null) options = {};

    var compileOptions = {};

    var chunks = [];
    function transform(chunk, encoding, callback) 
    {
        chunks.push(chunk);
        callback();
    }

    function flush(callback) 
    {
        var stream = this;
        if(!onlyFirst)
        {
            onlyFirst=true;
            console.log(getPrefix()+'\n'); // print to stdout
        }
        var source = Buffer.concat(chunks).toString();
        stream.push(source);
        callback(null)
    }
    return through(transform, flush);
}

module.exports = engify;




// /*
// Usage: 

// 	node src/index.js --input test-src/index.js > my/output.js

// */

// var shell = require('shelljs')

// var browserify = require('browserify')
// ,	args = require('yargs').argv
// ,	path = require('path')


// shell.config.silent = true;

// var main = args['input']
// ,	target = args['output']

// shell.rm('-rf', target)


// if(main)
// {

// 	// console.log(args.browserifyTransform, path.dirname(main), path.basename(main))
// 	// shell.cd(path.dirname(main))

// 	var browserifyOptions = {
// 		transform: args.browserifyTransform || ''
// 	}; //{transform: 'hbsfy'}

// 	var b = browserify(main, browserifyOptions).bundle(); 
// 	readStream(b, function(error, buffer)
// 	{
// 		if(error)
// 		{
// 			console.log('ERROR: ', error.toString())
// 			process.exit(1)
// 		}
// 		if(target)
// 		{
// 			(getPrefix() + buffer).to(target); 
// 		}
// 		else
// 		{
// 			console.log(getPrefix() + buffer)
// 		}
// 	}); 
	
// 	//utilities 
// 	function readStream(stream, fn)
// 	{
// 		var buffers = [];
// 		stream.on('data', function(buffer) 
// 		{
// 			buffers.push(buffer);
// 		});
// 		stream.on('error', function(error) 
// 		{
// 			fn(error)
// 		});
// 		stream.on('end', function() 
// 		{
// 			var buffer = Buffer.concat(buffers);
// 			fn(null, buffer)
// 		})
// 	}

// }

