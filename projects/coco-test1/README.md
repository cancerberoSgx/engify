using coco script (https://github.com/satyr/coco) throgut cocoify (https://github.com/superjoe30/cocoify)

#build

	browserify -t cocoify -t engify index.co > output.js
	rhino output.js