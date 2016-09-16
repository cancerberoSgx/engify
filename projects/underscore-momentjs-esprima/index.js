var _ = require('underscore')
,	moment = require('moment')
,	esprima = require('esprima')

var formats = ['dddd', 'MMM Do YY', 'YYYY [escaped] YYYY', 'MMMM Do YYYY, h:mm:ss a']

var output = ''
_.each(formats, function(format)
{
	output += moment().format(format) + ', ';
}); 

var syntax = esprima.parse('var answer = 42');
output += ', '+JSON.stringify(syntax);
console.log(output)