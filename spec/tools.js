var shell = require('shelljs')

function forEachImplTest(commandFragment, stdOutPredicate, label)
{
	// var impls = ['rhino', 'node', 'js', 'jjs', 'jsc', 'ringo']  //, 'v7' - we temporarily left it out. 
	var impls = ['node']
	impls.forEach(function(impl)
	{
		var cmd = impl + ' ' + commandFragment
		console.log((label?label:'')+': '+cmd)
		var p = shell.exec(cmd)
		expect(p.code).toBe(0)

		var output = p.stdout
		if(impl === 'ringo')
		{
			output = p.stderr+'';
		}
		console.log(output)
		console.log('result: ', stdOutPredicate(output))
		expect(stdOutPredicate(output)||cmd+' passed').toBe(true)
	})
}

module.exports = {
	forEachImplTest: forEachImplTest
}