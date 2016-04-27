var _ = require('underscore')

var Model = function()
{

}
_.extend(Model.prototype, {
	greetings: function()
	{
		return 'hello world'
	}
})
module.exports = Model