/*
Just some integration tests over projects/ using the comand line and jasmine. Run it with command : 

	node  node_modules/jasmine/bin/jasmine.js
*/


var shell = require('shelljs')
// ,	_ = require('underscore')

shell.config.silent = true

function forEachImplTest(commandFragment, stdOutPredicate)
{
	var impls = ['rhino', 'node', 'js', 'jjs', 'jsc']  //, 'v7' - we temporarily left it out. 
	impls.forEach(function(impl)
	{
		var cmd = impl + ' ' + commandFragment
		var p = shell.exec(cmd)
		expect(p.code).toBe(0)
		// console.log(p.stdout)
		expect(stdOutPredicate(p.stdout)||cmd+' passed').toBe(true)
	})
}


describe('projects', function()
{
	it('test-src', function()
	{
		// shell.rm('-rf', 'test-src/node_modules')
		shell.cd('test-src')
		// expect(shell.exec('npm install').code).toBe(0)
		shell.cd('..')

		var p = shell.exec('node src/index.js --input ./test-src')
		shell.rm('output.js')
		p.to('output.js')
		expect(p.code).toBe(0)

		forEachImplTest('output.js', function(output)
		{
			return output.indexOf('model.greetings() hello world')!==-1
		})
	});

	it('projects/browserify-tranform-test', function()
	{
		// shell.rm('-rf', './projects/browserify-transform-test/node_modules')
		shell.cd('./projects/browserify-transform-test')
		// expect(shell.exec('npm install').code).toBe(0)

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