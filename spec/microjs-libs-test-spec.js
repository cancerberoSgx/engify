// /*
// Just some integration tests over projects/ using the comand line and jasmine. Run it with command : 

// 	node  node_modules/jasmine/bin/jasmine.js
// */

// var shell = require('shelljs')

// var forEachImplTest = require('./tools.js').forEachImplTest; 

// shell.config.silent = true


// describe('projects', function()
// {

// 	it('projects/microjs-libs-test', function()
// 	{
// 		shell.rm('-rf', './projects/microjs-libs-test/node_modules')
// 		shell.cd('./projects/microjs-libs-test')
// 		expect(shell.exec('npm install').code).toBe(0)
// 		var p = shell.exec('browserify -t engify index.js')
// 		shell.rm('output.js')
// 		p.to('output.js')
// 		expect(p.code).toBe(0)

// 		forEachImplTest('output.js', function(output)
// 		{
// 			return output.indexOf('Beer')!==-1 && 
// 				output.indexOf('filesize: 265.32 kB')!==-1 && 
// 				output.indexOf('<div class="test"><test class="child"></test></div>')!==-1
// 		})

// 		shell.cd('../..')
// 	});

// })