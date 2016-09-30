var nunjucks= require('nunjucks')

nunjucks.configure({ autoescape: true });
var out = nunjucks.renderString('Hello {{ username }}', { username: 'James' });
console.log(out)