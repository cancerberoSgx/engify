/*
Just some integration tests over projects/ using the comand line and jasmine. Run it with command : 

	node  node_modules/jasmine/bin/jasmine.js
*/

var shell = require('shelljs')

var forEachImplTest = require('./tools.js').forEachImplTest; 

shell.config.silent = true


describe('projects', function()
{
	it('projects/typescript', function()
	{
		// shell.rm('-rf', './projects/ls1/node_modules')
		shell.cd('./projects/ts1')
		expect(shell.exec('npm install').code).toBe(0)

		var p = shell.exec('browserify -p tsify -t engify src/model1.ts')
		shell.rm('output.js')
		p.to('output.js')
		expect(p.code).toBe(0)

		forEachImplTest('output.js', function(output)
		{
			return output.indexOf('Hellooo, Jane User')!==-1
		})

		shell.cd('../..')
	});

	it('projects/livescript', function()
	{
		// shell.rm('-rf', './projects/ls1/node_modules')
		shell.cd('./projects/ls1')
		expect(shell.exec('npm install').code).toBe(0)

		var p = shell.exec('browserify -t engify -t browserify-livescript index.ls')
		shell.rm('output.js')
		p.to('output.js')
		expect(p.code).toBe(0)

		forEachImplTest('output.js', function(output)
		{
			return output.indexOf('[{"id":1,"name":"george"},{"id":2,"name":"mike"},{"id":3,"name":"donald"}]')!==-1 && 
				output.indexOf('20')!==-1
		})

		shell.cd('../..')
	});

	it('projects/coffeescript', function()
	{
		// shell.rm('-rf', './projects/cs1/node_modules')
		shell.cd('./projects/cs1')
		// expect(shell.exec('npm install').code).toBe(0)

		var p = shell.exec('browserify -t engify -t coffeeify index.coffee')
		shell.rm('output.js')
		p.to('output.js')
		expect(p.code).toBe(0)

		forEachImplTest('output.js', function(output)
		{
			return output.indexOf('1-8-27-64-125')!==-1
		})

		shell.cd('../..')
	});
})