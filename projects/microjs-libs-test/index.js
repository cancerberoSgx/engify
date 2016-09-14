var Bottle = require('bottlejs')
// require('../../engify-base')

var filesize = require('filesize')


var Beer = function() { console.log('Beer') };
// You can register the constructor with Bottle#service:

var bottle = new Bottle();
bottle.service('Beer', Beer);
// Later, when you need the constructed service, you just access the Beer property like this:

bottle.container.Beer;

console.log('filesize: '+filesize(265318, {base: 10}))

var expando = require('./expando')
console.log(expando('.test{.child-test}'))