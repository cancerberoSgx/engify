rm -rf output; 
mkdir output; 
babel src -d output
cp -r src/view/templates output/view
browserify -t engify -t hbsfy output/index.js > output/bundle.js
	
#jsc output/bundle.js  