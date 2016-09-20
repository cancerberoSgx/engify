/*
Just some integration tests over projects/ using the comand line and jasmine. Run it with command :

	node  node_modules/jasmine/bin/jasmine.js
*/

var shell = require('shelljs')

var forEachImplTest = require('./tools.js').forEachImplTest;

shell.config.silent = true

describe('projects', function()
{
	// it('projects/browserify-tranform-test', function()
	// {
	// 	// shell.rm('-rf', './projects/browserify-transform-test/node_modules')
	// 	shell.cd('./projects/browserify-transform-test')
	// 	expect(shell.exec('npm install').code).toBe(0)

	// 	var p = shell.exec('browserify -t engify src/index.js')
	// 	shell.rm('output.js')
	// 	p.to('output.js')
	// 	expect(p.code).toBe(0)

	// 	forEachImplTest('output.js', function(output)
	// 	{
	// 		return output.indexOf('result and the greeting is : hello there!!')!==-1
	// 	}, 'browserify-transform-test')

	// 	shell.cd('../..')
	// });

	// it('projects/hbsfy-test', function()
	// {
	// 	// shell.rm('-rf', './projects/hbsfy-test/node_modules')
	// 	shell.cd('./projects/hbsfy-test')
	// 	expect(shell.exec('npm install').code).toBe(0)

	// 	var p = shell.exec('browserify -t engify -t hbsfy index.js')
	// 	shell.rm('output.js')
	// 	p.to('output.js')
	// 	expect(p.code).toBe(0)

	// 	forEachImplTest('output.js', function(output)
	// 	{
	// 		return output.indexOf('<head><title>test</title></head>')!==-1 &&
	// 			output.indexOf('<p>Hello seba</p>')!==-1
	// 	}, 'hbsfy-test');

	// 	shell.cd('../..')
	// });

	// it('projects/crypto-js-test', function()
	// {
	// 	// shell.rm('-rf', './projects/crypto-js-test/node_modules')
	// 	shell.cd('./projects/crypto-js-test')
	// 	expect(shell.exec('npm install').code).toBe(0)

	// 	var p = shell.exec('browserify -t engify index.js')
	// 	shell.rm('output.js')
	// 	p.to('output.js')
	// 	expect(p.code).toBe(0)

	// 	forEachImplTest('output.js', function(output)
	// 	{

	// 		return output.indexOf('my message')!==-1 &&
	// 			output.indexOf('[{"id":1},{"id":2}]')!==-1
	// 	}, 'crypto-js-test');

	// 	shell.cd('../..')
	// });

	// it('projects/underscore-momentjs-esprima', function()
	// {
	// 	// shell.rm('-rf', './projects/underscore-momentjs-esprima/node_modules')
	// 	shell.cd('./projects/underscore-momentjs-esprima')
	// 	expect(shell.exec('npm install').code).toBe(0)

	// 	var p = shell.exec('browserify -t engify index.js')
	// 	shell.rm('output.js')
	// 	p.to('output.js')
	// 	expect(p.code).toBe(0)

	// 	forEachImplTest('output.js', function(output)
	// 	{
	// 		//TODO we are not verifying moment js date
	// 		return output.indexOf('{"type":"Program","body"')!==-1
	// 	}, 'underscore-momentjs-esprima');

	// 	shell.cd('../..')
	// });

	it('projects/babel-browserify', function()
	{
		// shell.rm('-rf', './projects/babel-browserify/node_modules')
		shell.cd('./projects/babel-browserify')
		expect(shell.exec('npm install').code).toBe(0)

		//rm -rf output; mkdir output; babel src -d output
	  //browserify -t engify output/index.js > output/bundle.js
		shell.rm('-rf', 'output')
		shell.mkdir('output')
		var p = shell.exec('babel src -d output')
		expect(p.code).toBe(0)
		expect(shell.test('-f', 'output/index.js')).toBe(true)

		p = shell.exec('browserify -t engify output/index.js')
		shell.rm('output/bundle.js')
		p.to('output/bundle.js')
		expect(p.code).toBe(0)

		forEachImplTest('output/bundle.js', function(output)
		{
			return output.indexOf('from model 1')!==-1;
		}, 'projects/babel-browserify')
		shell.cd('../..')
	});
})
