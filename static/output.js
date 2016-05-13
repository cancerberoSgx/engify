//this file is included into distribution and defines the global object

if(typeof(global)==='undefined')
{
	this.global = this; 
	global = this;
}; (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./js-compat')

// function f (o)
// {
// 	return "hello "+typeof(o);
// }

// var result = Object.prototype.toString.call(undefined)
console.log(Object.prototype.toString.toString())


// var moment = require('momentjs')

// function isObject(input) {
// 	return Object.prototype.toString.call(input) === '[object Object]';
// }

// console.log(f(null))

// var m = moment()
// var datestr = moment().format('MMMM Do YYYY, h:mm:ss a');

;


// console.log('date: ', new Date(1970, 0, 1, 0, 0, 0).getTime());
},{"./js-compat":2}],2:[function(require,module,exports){
//TODO pack this better. 
// var _ = require('underscore')
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

// _old_console = typeof(console)==='undefined'
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

// console.log('sgu', typeof(window)!=='undefined' && typeof(window.document)!=='undefined' && typeof(window.document.createElement)!=='undefined')

module.exports = tool;
},{}]},{},[1]);

