var _ = require('underscore')
,	moment = require('momentjs')

require('../../test-src/js-compat')

var formats = ['dddd', 'MMM Do YY', 'YYYY [escaped] YYYY', 'MMMM Do YYYY, h:mm:ss a']

var output = ''
_.each(formats, function(format)
{
	output += moment().format(format) + ', ';
}); 

output += _.template('<p><%= name%></p>')({name: 'seba'})

console.log(output)