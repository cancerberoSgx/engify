This project uses engify as a browserify transformation. 

	cd projects/browserify-transform-test
	npm install
	browserify -t engify src/index.js > output.js
	rhino output.js