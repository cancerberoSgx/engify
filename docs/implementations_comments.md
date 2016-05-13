These are some comments on my experience trying to run the code with each implementation

#speed comparison

Command times so far (1 is fast - 10 is slow). This doesn't mean that the engine itself is slow, just the commands: 

 * node: 1
 * rhino: 4
 * v7: 5
 * jjs : 9
 * browser : ?
 
#node / v8

    $ node output.js

 * fastest server-side impl
 * it runs the browserified version of the code while it could also run the real node src/index.js
 * console.log implemented


#rhino & jjs

    $ rhino output.js
    $ jjs output.js

 * rhino cmd line tool is faster than jjs
 * console.log is not available so we are using java bindings
 * no problems so far 

# v7: 

    $ v7.output.js

 * faster than jjs - little slower than rhino
 * underscore worked but momentjs don't (reported issue : https://github.com/cesanta/v7/issues/555)