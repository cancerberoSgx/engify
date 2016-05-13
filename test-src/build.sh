mkdir static

node src/index.js --input test-src/index.js > static/output.js

echo ""; echo "node: "
node static/output.js

echo ""; echo "rhino: "
rhino static/output.js 

echo ""; echo "jjs: "
jjs static/output.js 

echo ""; echo "v7: "
v7 static/output.js
