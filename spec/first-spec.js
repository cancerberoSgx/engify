/*
Just some integration tests over projects/ using the comand line and jasmine. Run it with command : 

	node  node_modules/jasmine/bin/jasmine.js
*/


var shell = require('shelljs')

shell.config.silent = true

describe('projects', function()
{
	it('test-src', function()
	{
		shell.rm('-rf', 'test-src/node_modules')
		shell.cd('test-src')
		expect(shell.exec('npm install').code).toBe(0)
		shell.cd('..')

		var p = shell.exec('node src/index.js --input ./test-src')
		p.to('output.js')
		expect(p.code).toBe(0)

		p = shell.exec('rhino output.js')
		expect(p.stdout).toContain('model.greetings() hello world')
		shell.rm('-rf', 'output.js')
	});
})