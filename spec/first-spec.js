/*
Just some integration tests over projects/ using the comand line and jasmine. Run it with command : 

	node  node_modules/jasmine/bin/jasmine.js
*/

var shell = require('shelljs')

var forEachImplTest = require('./tools.js').forEachImplTest; 

shell.config.silent = true


describe('projects', function()
{

	it('projects/browserify-tranform-test', function()
	{
		// shell.rm('-rf', './projects/browserify-transform-test/node_modules')
		shell.cd('./projects/browserify-transform-test')
		expect(shell.exec('npm install').code).toBe(0)

		var p = shell.exec('browserify -t engify src/index.js')
		shell.rm('output.js')
		p.to('output.js')
		expect(p.code).toBe(0)

		forEachImplTest('output.js', function(output)
		{
			return output.indexOf('result and the greeting is : hello there!!')!==-1
		})

		shell.cd('../..')
	});

	it('projects/hbsfy-test', function()
	{
		// shell.rm('-rf', './projects/hbsfy-test/node_modules')
		shell.cd('./projects/hbsfy-test')
		// expect(shell.exec('npm install hbsfy ../..').code).toBe(0)

		var p = shell.exec('browserify -t engify -t hbsfy index.js')
		shell.rm('output.js')
		p.to('output.js')
		expect(p.code).toBe(0)

		forEachImplTest('output.js', function(output)
		{
			return output.indexOf('<head><title>test</title></head>')!==-1 && 
				output.indexOf('<p>Hello seba</p>')!==-1
		});

		shell.cd('../..')
	});

})