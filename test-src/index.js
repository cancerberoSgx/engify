
require('./js-compat')
var FooModel = require('./model/FooModel')
var _ = require('underscore')
function service (request, response)
{
	var model = new FooModel();

	response.write('hello world model: '+model.greetings())
}
global.service = service;


console.log('model.greetings()', new FooModel().greetings());
