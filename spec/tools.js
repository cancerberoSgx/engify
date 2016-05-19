var shell = require('shelljs')

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

module.exports = {
	forEachImplTest: forEachImplTest
}