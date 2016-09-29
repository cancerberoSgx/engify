var Handlebars = require('handlebars')


//register a partial
var fs = require('fs')
Handlebars.registerPartial('partial1', fs.readFileSync('./src/templates/partial1.tpl', 'utf8'))
Handlebars.registerPartial('kids', fs.readFileSync('./src/templates/kids.tpl', 'utf8'))


var source = fs.readFileSync('./src/templates/main.tpl', 'utf8')
// "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
//              "{{kids.length}} kids:</p>" +
//              "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>"+
//              "\n{{> partial1 }}";
var template = Handlebars.compile(source);

var data = { 
	"name": "Alan", "hometown": "Somewhere, TX",
	"kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}],
	"cart": [{itemName: "Bike", quantity: 2, custom: {color: 'red', size: 16, model: 'mountain'}}],
	"searchResult": {
		filters: {},
		items: [
			{name:'Bike', description: 'veyr nice one', images: []}, 
			{},
			{}
		]
	}
};
var result = template(data);
console.log(result)