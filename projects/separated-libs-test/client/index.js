// compile it with command: 
// 		browserify -u underscore -u moment index.js > lib.js

var _ = require('underscore')

var moment = require('moment')

var ctx = {date: moment("20111031", "YYYYMMDD").fromNow(), name: 'seba g'}
var tpl = _.template('<b><%= date%>, name: <%= name%></b>')
var result = tpl(ctx)
console.log(result)

global.service = function(request, response)
{
	response.write(result)
}