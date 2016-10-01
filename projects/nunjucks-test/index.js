var nunjucks= require('nunjucks')

nunjucks.configure({ autoescape: true });
var out = nunjucks.renderString('Hello {{ username }}', { username: 'James' });
console.log(out)

var child = require('./templates/child.nunj')
var out2 = child.render({})
console.log(out2)