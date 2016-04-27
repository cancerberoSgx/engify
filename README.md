Sample project using commons.js that runs in node, rhino, Nashorn, [v7](https://github.com/cesanta/v7) ns ssp and the browser!

The idea is to see to what point one is able to write 'pure' javascript. The idea is to verify some kind of javascript-engine-implementation isolation by running our source code (unit test) in different impls.

Objectives:

 * we base our apis in nodejs - commonsjs for file dependencies and use browserify to support this.
 * GLOBAL object supported so we can register global functions for registering as netsuite's scripts. 
 * console.log implemented.

command examples:

    #compile the output file:
    node src/index my/src/index.js > output1.js

    #run in node
    node output1.js

    #run in Nashorn
    jjs output1.js

    #run in v7 [v7](https://github.com/cesanta/v7)
    v7 output1.js

for running in ns - just renamte the file to .ss and run it as ss service

