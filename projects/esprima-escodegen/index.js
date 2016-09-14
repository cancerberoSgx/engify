var esprima = require('esprima') 
var escodegen = require('escodegen');
// require('../../engify-base');

function doUglify(s)
{
  var ast = esprima.parse(s);
  return  escodegen.generate(ast, {format: escodegen.FORMAT_MINIFY}) || s;
}

var code = 'var a = \'hello\'; \n\n\tfor(var i = 0; i<8; i++)\n{\n\t\tconsole.log(a+i);\n}\n'; 

var output = 'Original code: <pre>' + code + '</pre><br/>Minified code: <pre>'+doUglify(code)+'</pre>'


console.log(output)

global.service = function(request, response)
{
	response.write(output)
}