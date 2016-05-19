var template1 = require('./template1.hbs') ;

require('../../test-src/js-compat')

var result = template1({name: 'seba'})

global.service = function(request, response)
{
	response.write(result)
}

console.log(result)
