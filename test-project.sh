PREFIX="" # i.e. use PREFIX="time" to measure speed
INPUT=$1

rm -rf static
mkdir static

node src/index.js --input ${INPUT} > static/output.js

echo ""; echo "node: "
${PREFIX} node static/output.js

echo ""; echo "rhino: "
${PREFIX} rhino static/output.js 

echo ""; echo "nashorn: "
${PREFIX} jjs static/output.js 

echo ""; echo "spidermonkey: "
${PREFIX} js static/output.js 

echo ""; echo "JavaScriptCore: "
${PREFIX} jsc static/output.js 

echo ""; echo "v7: "
${PREFIX} v7 static/output.js
