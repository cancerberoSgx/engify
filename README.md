#What's this?

This projects is just some basic ideas and experiments to see if we can write js code that runs in several js engines implementations: 

 * node
 * browser
 * [rhino](https://developer.mozilla.org/es/docs/Rhino)
 * [Nashorn](https://en.wikipedia.org/wiki/Nashorn_(JavaScript_engine))
 * [v7](https://github.com/cesanta/v7) 
 * netsuite ssp - suitescript

Initially born as a proof of concept to see if netsuite scripts could be written in commons-js a la node. Also a personal research on different javascript implementations. 

This project is inspired and based on [browserify](http://browserify.org/) but try to extend the browser-node to other js engines like rhino, nashhorn, etc.

*Right now is just an idea and experiments*

The idea is to see to what point one is able to write 'pure' JavaScript and  verify some kind of JavaScript-engine-implementation isolation by running our source code (unit test) in different implementations.


#Interesting commands

Right now all the experiment consists in this command to compile the example project test-src: 

    #compile sample project test-src: into a bundle
    node src/index.js --input test-src/index.js > static/output.js

    #run in node
    node output.js

    #run in Nashorn
    jjs output.js

    #run in rhino
    rhino output.js

    #run in v7 [v7](https://github.com/cesanta/v7)
    v7 output.js

    #compile and run in the abobe in a single command: 
    sh test/test1.sh

    #execute them all
    node static/output.js; rhino static/output.js ; jjs static/output.js ; v7 static/output.js

    # measure time:
    time node static/output.js; time rhino static/output.js ; time jjs static/output.js ; time v7 static/output.js




#Objectives

 * we base our apis in nodejs - commons-js for file dependencies and use browserify to support this.
 * global object supported so we can register global functions for registering as netsuite's scripts.

#APIs implemented

As in browserify, we need to implement some apis outside the JavaScript language standard, so far: 

 * console.log
 * GLOBAL : the GLOBAL this object outside browserify's closures. 
 * -end of the list-

#libraries supported/tested

 * underscore


#Netsuite
for running in netsuite, just rename the file to .ss and run it as SuiteScript service. It works because test-src/index.js declares a global working service function. 


#release 

On any commit we should make the following commands work: 
    git clone https://github.com/cancerberoSgx/engify.git
    cd engify
    npm install

    cd test-src
    npm install
    cd ..    
    sh test-src/build.sh

#TODO /Misc

 * support browser!
 * put global and consol.log in a commons-js module
 * bin program: engify my/project/services/service1.js > output.js
 * Should be a browserify transformation ? currently not just uses browserify js api. write it anyway : (from https://github.com/substack/browserify-handbook)
                Transforms implement a simple streaming interface. Here is a transform that replaces $CWD with the process.cwd():

                var through = require('through2');

                module.exports = function (file) {
                    return through(function (buf, enc, next) {
                        this.push(buf.toString('utf8').replace(/\$CWD/g, process.cwd()));
                        next();
                    });
                };

 * put test-src as a separate project
 * browserify experiment: load libraries in ssp-libraries files and be able to use require() directly in .ss / scripts.  



