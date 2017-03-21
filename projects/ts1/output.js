this._GLOBAL=this;_GLOBAL=this;if(typeof global==='undefined'){this.global=this;global=this}if(typeof window==='undefined'){window=this}var tool={isJJS:function(){return typeof Java==='object'},isns:function(){return typeof nlapiLoadRecord!=='undefined'},isNode:function(){return typeof console!=='undefined'},isRhino:function(){return typeof java!=='undefined'},isBrowser:function(){return false},isV7:function(){return typeof print!=='undefined'},environment:function(){var env;if(tool.isns()){env='ns'}else if(tool.isBrowser()){env='browser'}else if(tool.isV7()){env='v7'}else if(tool.isJJS()){env='jjs'}else if(tool.isRhino()){env='rhino'}else if(tool.isNode()){env='node'}return env}};engifyTool=tool;console={log:function(){var env=tool.environment();if(env==='ns'){nlapiLogExecution('DEBUG','jslog',Array.prototype.slice.call(arguments).join(', '))}else if(env==='jjs'){var System=Java.type('java.lang.System');System.out.println(Array.prototype.slice.call(arguments).join(', '))}else if(env==='rhino'){java.lang.System.out.println(Array.prototype.slice.call(arguments).join(', '))}else if(env==='node'){console.log.apply(console,arguments)}else if(env==='browser'){console.log.apply(console,arguments)}else if(env==='v7'){print.apply(this,arguments)}}};console.error=console.log; 

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Student = (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hellooo, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
console.log(greeter(user));
// interface Request 
// {
// 	getParameter(param:string):string;
// }
// interface Response 
// {
// 	write(s:string):void;
// }
// declare var global
// global.service = function(request:Request, response: Response)
// {
// 	response.write(greeter(user))
// } 

},{}]},{},[1]);
