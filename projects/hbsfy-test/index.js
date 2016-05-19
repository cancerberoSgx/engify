var template1 = require('./template1.hbs') ;

require('../../engify-base')

var result = template1({name: 'seba'})

global.service = function(request, response)
{
	response.write(result)
}

console.log(result)
