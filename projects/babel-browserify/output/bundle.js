if(typeof global==='undefined'){this.global=this;global=this}var tool={isJJS:function(){return typeof Java==='object'},isns:function(){return typeof nlapiLoadRecord!=='undefined'},isNode:function(){return typeof console!=='undefined'},isRhino:function(){return typeof java!=='undefined'},isBrowser:function(){return false},isV7:function(){return typeof print!=='undefined'},environment:function(){var env;if(tool.isns()){env='ns'}else if(tool.isBrowser()){env='browser'}else if(tool.isV7()){env='v7'}else if(tool.isJJS()){env='jjs'}else if(tool.isRhino()){env='rhino'}else if(tool.isNode()){env='node'}return env}};engifyTool=tool;console={log:function(){var env=tool.environment();if(env==='ns'){nlapiLogExecution('DEBUG','jslog',Array.prototype.slice.call(arguments).join(', '))}else if(env==='jjs'){var System=Java.type('java.lang.System');System.out.println(Array.prototype.slice.call(arguments).join(', '))}else if(env==='rhino'){java.lang.System.out.println(Array.prototype.slice.call(arguments).join(', '))}else if(env==='node'){console.log.apply(console,arguments)}else if(env==='browser'){console.log.apply(console,arguments)}else if(env==='v7'){print.apply(this,arguments)}}};console.error=console.log; 

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Model = require('./model/Model1');

var _Model2 = _interopRequireDefault(_Model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _Model2.default)();
},{"./model/Model1":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var f = function f() {
  console.log('from model 1');
};
// Object.assign(Class.prototype, {
// 	hello: ()=>{return 'from model 1'}
// })

exports.default = f;
},{}]},{},[1]);
