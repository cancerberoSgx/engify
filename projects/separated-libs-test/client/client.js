if(typeof global==='undefined'){this.global=this;global=this}; 

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
// compile it with command: 
// 		browserify -u underscore -u moment index.js > lib.js

var _ = require('underscore')

var moment = require('moment')

var ctx = {date: moment("20111031", "YYYYMMDD").fromNow(), name: 'seba g'}
var tpl = _.template('<b><%= date%>, name: <%= name%></b>')
var result = tpl(ctx)
console.log(result)

global.service = function(request, response)
{
	response.write(result)
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"moment":undefined,"underscore":undefined}]},{},[1]);
