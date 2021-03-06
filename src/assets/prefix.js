/*

this file is included into distribution and defines:

 * the global object: 'global' and '_GLOBAL'
 * console.log - very basic: one single param

*/

this._GLOBAL = this; 
_GLOBAL = this; 

if(typeof(global)==='undefined')
{
	this.global = this; 
	global = this;
}
if(typeof(window)==='undefined')
{
	window = this; 
}
var tool = {
	isJJS: function()
	{
		return typeof(Java) ==='object';
	}
,	isns: function()
	{
		return typeof(nlapiLoadRecord)!=='undefined';
	}
,	isNode: function()
	{
		return typeof(console)!=='undefined';
	}
,	isRhino: function()
	{
		return typeof(java)!=='undefined';
	}
,	isBrowser: function()
	{
		return false//typeof(window)!=='undefined' && typeof(window.document)!=='undefined' && typeof(window.document.createElement)!=='undefined'; 
	}
,	isV7: function()
	{
		return typeof(print)!=='undefined';
	}
,	environment: function()
	{
		var env;
		if(tool.isns())
		{
			env = 'ns';
		}
		else if(tool.isBrowser())
		{			
			env = 'browser';
		}
		else if(tool.isV7())
		{			
			env = 'v7';
		}
		else if(tool.isJJS())	
		{			
			env = 'jjs';	
		}
		else if(tool.isRhino())
		{
			env = 'rhino';
		}
		else if(tool.isNode())
		{			
			env = 'node';
		}
		return env
	}
}

engifyTool = tool;

//console
console = {
	log: function()
	{
		var env = tool.environment();
		if(env==='ns')
		{
			nlapiLogExecution('DEBUG',  'jslog', Array.prototype.slice.call(arguments).join(', '));
		}
		else if(env==='jjs')
		{
			var System = Java.type('java.lang.System');
			System.out.println(Array.prototype.slice.call(arguments).join(', '));		
		}
		else if(env==='rhino')
		{
			java.lang.System.out.println(Array.prototype.slice.call(arguments).join(', '));		
		}
		else if(env==='node')
		{
			console.log.apply(console, arguments);
		}
		else if(env==='browser')
		{
			console.log.apply(console, arguments);
		}
		else if(env==='v7')
		{
			print.apply(this, arguments)
		}
	}
}

console.error = console.log; 