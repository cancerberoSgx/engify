node src/index.js --input test-src/index.js > static/output.js

echo "node: "
node static/output.js

echo "rhino: "
rhino static/output.js 

echo "jjs: "
jjs static/output.js 

echo "v7: "
v7 static/output.js
