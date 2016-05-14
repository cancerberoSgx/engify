
INPUT=$1

rm -rf static
mkdir static

node src/index.js --input ${INPUT} > static/output.js

echo ""; echo "node: "
node static/output.js

echo ""; echo "rhino: "
rhino static/output.js 

echo ""; echo "nashorn: "
jjs static/output.js 

echo ""; echo "spidermonkey: "
js static/output.js 

echo ""; echo "v7: "
v7 static/output.js
