/*
Just some integration tests over projects/ using the comand line and jasmine. Run it with command : 

	node  node_modules/jasmine/bin/jasmine.js
*/

var shell = require('shelljs')

var forEachImplTest = require('./tools.js').forEachImplTest; 

shell.config.silent = true


describe('projects', function()
{

	it('projects/esprima-escodegen', function()
	{
		shell.rm('-rf', './projects/esprima-escodegen/node_modules')
		shell.cd('./projects/esprima-escodegen')
		expect(shell.exec('npm install').code).toBe(0)

		var p = shell.exec('browserify -t engify index.js')
		shell.rm('output.js')
		p.to('output.js')
		expect(p.code).toBe(0)

		forEachImplTest('output.js', function(output)
		{
			return output.indexOf('<pre>var a=\'hello\';for(var i=0;i<8;i++){console.log(a+i)}</pre>')!==-1
		})

		shell.cd('../..')
	});

})