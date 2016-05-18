/*
Just some integration tests over projects/ using the comand line and jasmine. Run it with command : 

	node  node_modules/jasmine/bin/jasmine.js
*/


var shell = require('shelljs')
// ,	_ = require('underscore')

shell.config.silent = true

function forEachImplTest(commandFragment, stdOutPredicate)
{
	var impls = ['rhino', 'node']
	impls.forEach(function(impl)
	{
		var cmd = impl + ' ' + commandFragment
		var p = shell.exec(cmd)
		expect(p.code).toBe(0)
		expect(stdOutPredicate(p.stdout)||cmd+' passed').toBe(true)
	})
}


describe('projects', function()
{
	it('test-src', function()
	{
		// shell.rm('-rf', 'test-src/node_modules')
		// shell.cd('test-src')
		// expect(shell.exec('npm install').code).toBe(0)
		// shell.cd('..')

		var p = shell.exec('node src/index.js --input ./test-src')
		p.to('output.js')
		expect(p.code).toBe(0)

		forEachImplTest('output.js', function(output){return output.indexOf('model.gre2etings() hello world')!==-1})
		// p = shell.exec('rhino output.js')
		// expect(p.stdout).toContain('model.greetings() hello world')
		shell.rm('-rf', 'output.js')
	});

	it('projects/browserify-tranform-test', function()
	{
		// shell.rm('-rf', './projects/browserify-transform-test/node_modules')
		shell.cd('./projects/browserify-transform-test')
		// expect(shell.exec('npm install').code).toBe(0)

		var p = shell.exec('browserify -t engify src/index.js')
		p.to('output.js')
		expect(p.code).toBe(0)

		p = shell.exec('rhino output.js')
		expect(p.stdout).toContain('result and the greeting is : hello there!!')
		shell.rm('-rf', 'output.js')
	});
})