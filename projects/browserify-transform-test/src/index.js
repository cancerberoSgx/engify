var _ = require('underscore')
var model1 = require('./model/model1.js')
var t = _.template('and the greeting is : <%= greeting %>')
var result = t(model1);

// require('../../../engify-base')
console.log('result', result)