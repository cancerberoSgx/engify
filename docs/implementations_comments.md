These are some comments on my experience trying to run the code with each implementation

#speed comparison

Command times so far (1 is fast - 10 is slow). This doesn't mean that the engine itself is slow, just the command line tools: 

 * spidermonkey: 1
 * JavaScriptCore: 2
 * node: 3
 * rhino: 6
 * v7: 7
 * jjs : 10
 * browser : ?
 
#node / v8

    $ node output.js

 * FAST: spidermonkey&JavaScriptCore cmd line tools are faster
 * it runs the browserified version of the code while it could also run the real node src/index.js
 * console.log implemented


#rhino & jjs

    $ rhino output.js
    $ jjs output.js

 * rhino cmd line tool is faster than jjs
 * console.log is not available so we are using java bindings
 * no problems so far 

# spidermonkey

 * https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey
 * FAST faster than node
 * no problems so far

# JavaScriptCore

 * http://webreflection.blogspot.com.uy/2010/10/javascriptcore-via-terminal.html
 * tested on OSX and linux
 * FAST faster than node but slower than spidermonkey ? 
 * no problems so far

# v7: 

    $ v7.output.js

 * faster than jjs - little slower than rhino
 * the only one problematic so far
 * problem with underscore.template - (Exec error [static/output.js]: "Invalid function body")
 * underscore worked but momentjs don't (reported issue : https://github.com/cesanta/v7/issues/555)
 * dont support deprecated apis, like Date.prototype.getYear - error in momentjs
 * for large code, must recompile it with option -DV7_LARGE_AST
