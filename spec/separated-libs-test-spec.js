/*
Just some integration tests over projects/ using the comand line and jasmine. Run it with command : 

	node  node_modules/jasmine/bin/jasmine.js
*/

var shell = require('shelljs')

var forEachImplTest = require('./tools.js').forEachImplTest; 

shell.config.silent = true


describe('separated libs test', function()
{
	it('separated-libs-test', function()
	{
		shell.rm('-rf', './projects/separated-libs-test/lib/node_modules')
		shell.cd('./projects/separated-libs-test/lib/')
		expect(shell.exec('npm install').code).toBe(0)

		var p = shell.exec('browserify -r underscore -r moment')
		shell.rm('lib.js')
		p.to('lib.js')
		expect(p.code).toBe(0)


		shell.cd('../../../')
		shell.rm('-rf', './projects/separated-libs-test/client/node_modules')
		shell.cd('./projects/separated-libs-test/client/')
		expect(shell.exec('npm install').code).toBe(0)

		var p = shell.exec('browserify -t engify -u underscore -u moment index.js')
		shell.rm('client.js')
		p.to('client.js')
		expect(p.code).toBe(0)

		shell.cat('../lib/lib.js').to('all.js')
		shell.cat('client.js').toEnd('all.js')

		forEachImplTest('all.js', function(output)
		{
			return output.indexOf('<b>5 years ago, name: seba g</b>')!==-1
		})

		shell.rm('../lib/lib.js')
		shell.rm('all.js')
		shell.rm('client.js')
		shell.cd('../../..')
	});


})