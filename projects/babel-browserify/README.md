browserify and babel-cli needs to be installed globally

  rm -rf output; mkdir output; babel src -d output
  browserify -t engify output/index.js > output/bundle.js
  jsc output/bundle.js   
