IMPORTANT : For running this project first run the following in the root engify folder:
    
    cd projects/hbsfy-test
    npm install
    browserify -t engify -t hbsfy test.js > output.js
    rhino output.js

This project shows how to write handlebars templates along our code and require them - based on browserify transformation hbsfy
