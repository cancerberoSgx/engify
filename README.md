#What's this?

This projects is just some basic ideas and experiments to see if we can write js code that runs in several js engines implementations: 

 * node
 * browser
 * [rhino](https://developer.mozilla.org/es/docs/Rhino)
 * [Nashorn](https://en.wikipedia.org/wiki/Nashorn_(JavaScript_engine))
 * spidermonkey (https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey)
 * JavaScriptCore (webkit.org - safary)
 * [v7](https://github.com/cesanta/v7) 


This project is inspired and based on [browserify](http://browserify.org/) but try to extend the browser-node to other js engines like rhino, nashhorn, etc.

*Right now is just an idea and experiments*

The idea is to see to what point one is able to write 'pure' JavaScript and  verify some kind of JavaScript-engine-implementation isolation by running our source code (unit test) in different implementations.

#Libraries tested

The following are libraries that I were able to use in all implementations: 

 * underscore
 * momentjs
 * esprima
 * handlebars

#Interesting commands

    #run a tool that compiles a project and run it in all the implementations: 
    sh test-project.js projects/handlebars-test

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

 * Be able to write code using npm and run it in all javascript implementations. 
 * support some very basic apis in all the impls, like console.log and the global object.
 * try to run js libraries that currently support browser and node like underscore, momentjs, esprima, lodash, acorn, etc in the rest of the implementations. 

#APIs implemented

As in browserify, we need to implement some apis outside the JavaScript language standard, so far: 

 * console.log
 * GLOBAL : the GLOBAL this object outside browserify's closures. 
 * -end of the list-

#libraries supported/tested

 * underscore
 * momentjs
 * esprima

#Release Test

On any commit we should make the following commands work: 

    git clone https://github.com/cancerberoSgx/engify.git
    cd engify
    npm install

    cd test-src
    npm install
    cd ..    
    sh test-project.sh test-src

This last command will build givven test-src/index.js into static/ folder and then run it with all supported engines in the command line. 

#TODO /Misc

 * support browser!
 * try windows native javascript engines (http://superuser.com/questions/488763/how-to-run-js-file-from-a-command-line-on-windows)
 * move file ../../test-src/js-compat to separate project
 * put global and console.log in a commons-js module
 * bin program: engify my/project/services/service1.js > output.js
 * Should be a browserify transformation ? currently not just uses browserify js api. write it anyway : (from https://github.com/substack/browserify-handbook)
 * put test-src as a separate project
 * browserify experiment: load libraries in ssp-libraries files and be able to use require() directly in .ss / scripts.  probably i need to use a browserify flag.



