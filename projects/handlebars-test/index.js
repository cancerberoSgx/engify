var Handlebars = require('handlebars')

//register a partial
var fs = require('fs')
Handlebars.registerPartial('partial1', fs.readFileSync('./partial1.tpl', 'utf8'))


var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
             "{{kids.length}} kids:</p>" +
             "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>"+
             "\n{{> partial1 }}";
var template = Handlebars.compile(source);

var data = { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
var result = template(data);
console.log(result)