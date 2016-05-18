IMPORTANT : For running this project first run the following in the root engify folder:
    
    npm install --save handlebars hbsfy

Compiling and runing it: 

    mkdir static
    node src/index.js --input projects/hbsfy-test/test.js --browserify-transform="hbsfy" > static/output.js
    node static/output.js


This project shows how to write handlebars templates along our code and require them - based on browserify transofmration hbsfy
