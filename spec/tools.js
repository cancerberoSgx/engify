var shell = require('shelljs')

function forEachImplTest(commandFragment, stdOutPredicate)
{
	// var impls = ['rhino', 'node', 'js', 'jjs', 'jsc', 'ringo']  //, 'v7' - we temporarily left it out. 
	var impls = ['rhino']
	impls.forEach(function(impl)
	{
		var cmd = impl + ' ' + commandFragment
		var p = shell.exec(cmd)
		expect(p.code).toBe(0)

		var output = p.stdout
		if(impl === 'ringo')
		{
			output = p.stderr+'';
		}
		// console.log(p.stdout)
		expect(stdOutPredicate(output)||cmd+' passed').toBe(true)
	})
}

module.exports = {
	forEachImplTest: forEachImplTest
}