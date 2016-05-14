var _ = require('underscore')
,	moment = require('momentjs')

require('../../test-src/js-compat')

var formats = ['dddd', 'MMM Do YY', 'YYYY [escaped] YYYY', 'MMMM Do YYYY, h:mm:ss a']

_.each(formats, function(format)
{
	console.log(moment().format(format));
}); 