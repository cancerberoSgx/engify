var _ = require('underscore')

var moment = require('moment')


require('../../../engify-base')
var ctx = {date: moment("20111031", "YYYYMMDD").fromNow(), name: 'seba g'}
var tpl = _.template('<b><%= date%>, name: <%= name%></b>')
console.log(tpl(ctx))
