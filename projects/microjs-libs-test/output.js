if(typeof global==='undefined'){this.global=this;global=this}var tool={isJJS:function(){return typeof Java==='object'},isns:function(){return typeof nlapiLoadRecord!=='undefined'},isNode:function(){return typeof console!=='undefined'},isRhino:function(){return typeof java!=='undefined'},isBrowser:function(){return false},isV7:function(){return typeof print!=='undefined'},environment:function(){var env;if(tool.isns()){env='ns'}else if(tool.isBrowser()){env='browser'}else if(tool.isV7()){env='v7'}else if(tool.isJJS()){env='jjs'}else if(tool.isRhino()){env='rhino'}else if(tool.isNode()){env='node'}return env}};engifyTool=tool;console={log:function(){var env=tool.environment();if(env==='ns'){nlapiLogExecution('DEBUG','jslog',Array.prototype.slice.call(arguments).join(', '))}else if(env==='jjs'){var System=Java.type('java.lang.System');System.out.println(Array.prototype.slice.call(arguments).join(', '))}else if(env==='rhino'){java.lang.System.out.println(Array.prototype.slice.call(arguments).join(', '))}else if(env==='node'){console.log.apply(console,arguments)}else if(env==='browser'){console.log.apply(console,arguments)}else if(env==='v7'){print.apply(this,arguments)}}};console.error=console.log; 

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var callbacks, expando, filters, ls, node, setLS, tokenizer, treeify;

  ls = false;

  callbacks = [];

  filters = [];

  setLS = function() {
    var val;
    val = JSON.stringify(expando.cache);
    if (localStorage.expandocache !== val) {
      return localStorage.expandocache = val;
    }
  };

  expando = function(expansion) {
    var callback, filter, temp, _i, _j, _len, _len1;
    temp = "";
    if ((temp = expando.cache[expansion]) === void 0) {
      expando.cache[expansion] = temp = (new treeify(expansion)).generateNodes();
      if (ls) {
        setTimeout(setLS, 0);
      }
    }
    if (filters.length > 0) {
      for (_i = 0, _len = filters.length; _i < _len; _i++) {
        filter = filters[_i];
        temp = filter(temp);
      }
    }
    if (callbacks.length > 0) {
      for (_j = 0, _len1 = callbacks.length; _j < _len1; _j++) {
        callback = callbacks[_j];
        callback(temp);
      }
    }
    return temp;
  };

  expando.cache = [];

  expando.addFilter = function(filter) {
    return filters.push(filter);
  };

  expando.addCallback = function(callback) {
    return callbacks.push(callback);
  };

  if (!(typeof window === "undefined")) {
    window.expando = expando;
    try {
      ls = "localStorage" in window && window["localStorage"] !== null;
    } catch (_error) {

    }
    if (ls) {
      try {
        expando.cache = JSON.parse(localStorage.expandocache);
      } catch (_error) {
        expando.cache = [];
      }
    }
  }

  if (!(typeof module === "undefined") && !(typeof module.exports === "undefined")) {
    module.exports = expando;
  }

  node = (function() {
    var repeat, voidElements;

    voidElements = " area base br col command embed hr img input keygen link meta param source track wbr ";

    repeat = function(str, times) {
      var res;
      res = "";
      while (times > 0) {
        if (times % 2 === 1) {
          res += str;
        }
        str += str;
        times >>= 1;
      }
      return res;
    };

    function node() {
      this.classList = [];
      this.id = "";
      this.attributes = "";
      this.tag = "";
      this.count = 1;
      this.children = [];
    }

    node.prototype.expand = function() {
      var attributes, children, classes, count, endTag, hasClasses, hasId, id, mynode, res, tag, _i, _len, _ref;
      if (!(typeof this.literal === "undefined")) {
        return this.literal;
      }
      _ref = {
        tag: this.tag,
        id: this.id,
        attributes: this.attributes,
        count: this.count,
        children: this.children
      }, tag = _ref.tag, id = _ref.id, attributes = _ref.attributes, count = _ref.count, children = _ref.children;
      classes = this.classList.join(' ');
      if (classes === "" && tag === "" && id === "" && attributes === "" && children.length === 0 && count === 1) {
        return "";
      }
      if (tag === "") {
        tag = "div";
      }
      endTag = (voidElements.indexOf(" " + tag + " ")) === -1;
      hasClasses = classes.length > 0;
      hasId = id !== "";
      res = "<" + tag;
      if (hasClasses) {
        res += ' class="' + classes + '"';
      }
      if (hasId) {
        res += ' id="' + id + '"';
      }
      if (attributes.length > 0) {
        res += " " + attributes;
      }
      res += ">";
      if (children.length > 0) {
        for (_i = 0, _len = children.length; _i < _len; _i++) {
          mynode = children[_i];
          res += mynode.expand();
        }
      }
      if (endTag) {
        res += "</" + tag + ">";
      }
      if (count > 1) {
        res = repeat(res, count);
      }
      return res;
    };

    return node;

  })();

  tokenizer = (function() {
    var isA, isAn, isCombinator, isN;

    isAn = function(_char) {
      return (_char >= "a" && _char <= "z") || (_char >= "A" && _char <= "Z") || (_char >= "0" && _char <= "9");
    };

    isA = function(_char) {
      return (_char >= "a" && _char <= "z") || (_char >= "A" && _char <= "Z");
    };

    isCombinator = function(_char) {
      return _char === "." || _char === "#" || _char === "{" || _char === "}" || _char === "+" || _char === "[";
    };

    isN = function(_char) {
      return _char >= "0" && _char <= "9";
    };

    function tokenizer(expansion) {
      this.expansion = expansion;
      this.length = expansion.length;
      this.location = 0;
    }

    tokenizer.prototype.readToken = function() {
      var expansion, length, location, res, _char, _ref;
      _ref = {
        location: this.location,
        length: this.length,
        expansion: this.expansion
      }, location = _ref.location, length = _ref.length, expansion = _ref.expansion;
      if (location > length - 1) {
        return {
          type: "EOT"
        };
      }
      _char = expansion.charAt(location);
      if (_char === "{" || _char === "}" || _char === "+" || _char === "[") {
        if (_char === "{" && (expansion.charAt(location + 1)) === "=") {
          this.location += 2;
          return this.escapedReadUntil("}", "LITERAL");
        }
        if (_char === "[") {
          this.location++;
          return this.escapedReadUntil("]", "ATTRIBUTES");
        }
        this.location++;
        return {
          token: _char,
          type: "COMBINATOR"
        };
      }
      if (isA(_char)) {
        return this.alphaNumericRead("TAG");
      }
      if (_char === ".") {
        this.location++;
        return this.alphaNumericRead("CLASS");
      }
      if (_char === "#") {
        this.location++;
        return this.alphaNumericRead("ID");
      }
      if (_char === "*") {
        this.location++;
        return this.numericRead("COUNT");
      }
      res = _char;
      while (!(isA(_char) || isCombinator(_char) || location > length)) {
        res += (_char = expansion.charAt(++location));
      }
      this.location = location;
      return this.readToken();
    };

    tokenizer.prototype.escapedReadUntil = function(endChar, type) {
      var expansion, length, location, res, _char;
      location = this.location;
      length = this.length;
      expansion = this.expansion;
      res = "";
      while ((_char = expansion.charAt(location)) !== endChar && location < length) {
        res += _char;
        location++;
      }
      this.location = ++location;
      return {
        token: res,
        type: type
      };
    };

    tokenizer.prototype.alphaNumericRead = function(type) {
      var expansion, location, res, _char;
      location = this.location;
      expansion = this.expansion;
      res = expansion.charAt(location);
      if (isCombinator(res)) {
        return {
          token: "",
          type: type
        };
      }
      while (isAn((_char = expansion.charAt(++location)))) {
        res += _char;
      }
      this.location = location;
      return {
        token: res,
        type: type
      };
    };

    tokenizer.prototype.numericRead = function(type) {
      var expansion, location, res, _char;
      location = this.location;
      expansion = this.expansion;
      res = expansion.charAt(location);
      if (isCombinator(res)) {
        return {
          token: "",
          type: type
        };
      }
      while (isN((_char = expansion.charAt(++location)))) {
        res += _char;
      }
      this.location = location;
      return {
        token: res,
        type: type
      };
    };

    return tokenizer;

  })();

  treeify = (function() {
    var push;

    push = Array.prototype.push;

    treeify.prototype.generateNodes = function(_index) {
      var child, expansion, index, length, mynode, nodeindex, nodelist, ref, token, tokens, _ref;
      if (this.expansion) {
        return this.expansion;
      }
      _ref = {
        length: this.length,
        tokens: this.tokens
      }, length = _ref.length, tokens = _ref.tokens;
      nodeindex = 0;
      nodelist = [];
      expansion = "";
      nodelist.push(new node);
      ref = nodelist[0];
      if (_index === void 0) {
        index = this.index;
      } else {
        index = _index;
      }
      while (index < length) {
        token = tokens[index];
        if (token.type === "EOT") {
          if (_index === void 0) {
            return ((function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = nodelist.length; _i < _len; _i++) {
                mynode = nodelist[_i];
                _results.push(mynode.expand());
              }
              return _results;
            })()).join('');
          }
          this.index = index - 1;
          return nodelist;
        }
        if (token.token === "}") {
          if (!(_index === void 0)) {
            this.index = index;
            return nodelist;
          }
        }
        if (nodelist[nodeindex] === void 0) {
          ref = nodelist[nodeindex] = new node;
        }
        if (token.token === "+") {
          nodeindex++;
        }
        if (token.token === "{") {
          push.apply(ref.children, this.generateNodes(++index));
          index = this.index;
          nodeindex++;
        }
        if (token.type === "CLASS") {
          ref.classList.push(token.token);
        }
        if (token.type === "ID") {
          if (ref.id === "") {
            ref.id = token.token;
          }
        }
        if (token.type === "TAG") {
          if (ref.tag === "") {
            ref.tag = token.token;
          }
        }
        if (token.type === "ATTRIBUTES") {
          ref.attributes += token.token;
        }
        if (token.type === "COUNT") {
          if (ref.count === 1) {
            ref.count = parseInt(token.token);
          }
        }
        if (token.type === "LITERAL") {
          child = new node;
          child.literal = token.token;
          ref.children.push(child);
          nodeindex++;
        }
        index++;
      }
      if (_index === void 0) {
        return ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = nodelist.length; _i < _len; _i++) {
            mynode = nodelist[_i];
            _results.push(mynode.expand());
          }
          return _results;
        })()).join('');
      }
      return nodelist;
    };

    function treeify(expansion) {
      var mytokenizer, tokens, x;
      mytokenizer = new tokenizer(expansion);
      tokens = [];
      this.index = 0;
      while (x = mytokenizer.readToken()) {
        tokens.push(x);
        if (x.type === "EOT") {
          break;
        }
      }
      this.tokens = tokens;
      this.length = tokens.length;
    }

    return treeify;

  })();

}).call(this);
},{}],2:[function(require,module,exports){
var Bottle = require('bottlejs')
// require('../../engify-base')

var filesize = require('filesize')


var Beer = function() { console.log('Beer') };
// You can register the constructor with Bottle#service:

var bottle = new Bottle();
bottle.service('Beer', Beer);
// Later, when you need the constructed service, you just access the Beer property like this:

bottle.container.Beer;

console.log('filesize: '+filesize(265318, {base: 10}))

var expando = require('./expando')
console.log(expando('.test{.child-test}'))
},{"./expando":1,"bottlejs":3,"filesize":4}],3:[function(require,module,exports){
(function (global){
;(function(undefined) {
    'use strict';
    /**
     * BottleJS v1.4.0 - 2016-08-03
     * A powerful dependency injection micro container
     *
     * Copyright (c) 2016 Stephen Young
     * Licensed MIT
     */
    
    /**
     * Unique id counter;
     *
     * @type Number
     */
    var id = 0;
    
    /**
     * Local slice alias
     *
     * @type Functions
     */
    var slice = Array.prototype.slice;
    
    /**
     * Map of fullnames by index => name
     *
     * @type Array
     */
    var fullnameMap = [];
    
    /**
     * Iterator used to flatten arrays with reduce.
     *
     * @param Array a
     * @param Array b
     * @return Array
     */
    var concatIterator = function concatIterator(a, b) {
        return a.concat(b);
    };
    
    /**
     * Get a group (middleware, decorator, etc.) for this bottle instance and service name.
     *
     * @param Array collection
     * @param Number id
     * @param String name
     * @return Array
     */
    var get = function get(collection, id, name) {
        var group = collection[id];
        if (!group) {
            group = collection[id] = {};
        }
        if (name && !group[name]) {
            group[name] = [];
        }
        return name ? group[name] : group;
    };
    
    /**
     * Will try to get all things from a collection by name, by __global__, and by mapped names.
     *
     * @param Array collection
     * @param Number id
     * @param String name
     * @return Array
     */
    var getAllWithMapped = function(collection, id, name) {
        return get(fullnameMap, id, name)
            .map(getMapped.bind(null, collection))
            .reduce(concatIterator, get(collection, id, name))
            .concat(get(collection, id, '__global__'));
    };
    
    /**
     * Iterator used to get decorators from a map
     *
     * @param Array collection
     * @param Object data
     * @return Function
     */
    var getMapped = function getMapped(collection, data) {
        return get(collection, data.id, data.fullname);
    };
    
    /**
     * Iterator used to walk down a nested object.
     *
     * If Bottle.config.strict is true, this method will throw an exception if it encounters an
     * undefined path
     *
     * @param Object obj
     * @param String prop
     * @return mixed
     * @throws Error if Bottle is unable to resolve the requested service.
     */
    var getNested = function getNested(obj, prop) {
        var service = obj[prop];
        if (service === undefined && globalConfig.strict) {
            throw new Error('Bottle was unable to resolve a service.  `' + prop + '` is undefined.');
        }
        return service;
    };
    
    /**
     * Get a service stored under a nested key
     *
     * @param String fullname
     * @return Service
     */
    var getNestedService = function getNestedService(fullname) {
        return fullname.split('.').reduce(getNested, this);
    };
    
    /**
     * A helper function for pushing middleware and decorators onto their stacks.
     *
     * @param Array collection
     * @param String name
     * @param Function func
     */
    var set = function set(collection, id, name, func) {
        if (typeof name === 'function') {
            func = name;
            name = '__global__';
        }
        get(collection, id, name).push(func);
    };
    
    /**
     * Register a constant
     *
     * @param String name
     * @param mixed value
     * @return Bottle
     */
    var constant = function constant(name, value) {
        var parts = name.split('.');
        name = parts.pop();
        defineConstant.call(parts.reduce(setValueObject, this.container), name, value);
        return this;
    };
    
    var defineConstant = function defineConstant(name, value) {
        Object.defineProperty(this, name, {
            configurable : false,
            enumerable : true,
            value : value,
            writable : false
        });
    };
    
    /**
     * Map of decorator by index => name
     *
     * @type Object
     */
    var decorators = [];
    
    /**
     * Register decorator.
     *
     * @param String name
     * @param Function func
     * @return Bottle
     */
    var decorator = function decorator(name, func) {
        set(decorators, this.id, name, func);
        return this;
    };
    
    /**
     * Map of deferred functions by id => name
     *
     * @type Object
     */
    var deferred = [];
    
    /**
     * Register a function that will be executed when Bottle#resolve is called.
     *
     * @param Function func
     * @return Bottle
     */
    var defer = function defer(func) {
        set(deferred, this.id, func);
        return this;
    };
    
    
    /**
     * Immediately instantiates the provided list of services and returns them.
     *
     * @param Array services
     * @return Array Array of instances (in the order they were provided)
     */
    var digest = function digest(services) {
        return (services || []).map(getNestedService, this.container);
    };
    
    /**
     * Register a factory inside a generic provider.
     *
     * @param String name
     * @param Function Factory
     * @return Bottle
     */
    var factory = function factory(name, Factory) {
        return provider.call(this, name, function GenericProvider() {
            this.$get = Factory;
        });
    };
    
    /**
     * Register an instance factory inside a generic factory.
     *
     * @param {String} name - The name of the service
     * @param {Function} Factory - The factory function, matches the signature required for the
     * `factory` method
     * @return Bottle
     */
    var instanceFactory = function instanceFactory(name, Factory) {
        return factory.call(this, name, function GenericInstanceFactory(container) {
            return {
                instance : Factory.bind(Factory, container)
            };
        });
    };
    
    /**
     * A filter function for removing bottle container methods and providers from a list of keys
     */
    var byMethod = function byMethod(name) {
        return !/^\$(?:register|list)$|Provider$/.test(name);
    };
    
    /**
     * List the services registered on the container.
     *
     * @param Object container
     * @return Array
     */
    var list = function list(container) {
        return Object.keys(container || this.container || {}).filter(byMethod);
    };
    
    /**
     * Map of middleware by index => name
     *
     * @type Object
     */
    var middles = [];
    
    /**
     * Function used by provider to set up middleware for each request.
     *
     * @param Number id
     * @param String name
     * @param Object instance
     * @param Object container
     * @return void
     */
    var applyMiddleware = function applyMiddleware(id, name, instance, container) {
        var middleware = getAllWithMapped(middles, id, name);
        var descriptor = {
            configurable : true,
            enumerable : true
        };
        if (middleware.length) {
            descriptor.get = function getWithMiddlewear() {
                var index = 0;
                var next = function nextMiddleware(err) {
                    if (err) {
                        throw err;
                    }
                    if (middleware[index]) {
                        middleware[index++](instance, next);
                    }
                };
                next();
                return instance;
            };
        } else {
            descriptor.value = instance;
            descriptor.writable = true;
        }
    
        Object.defineProperty(container, name, descriptor);
    
        return container[name];
    };
    
    /**
     * Register middleware.
     *
     * @param String name
     * @param Function func
     * @return Bottle
     */
    var middleware = function middleware(name, func) {
        set(middles, this.id, name, func);
        return this;
    };
    
    /**
     * Named bottle instances
     *
     * @type Object
     */
    var bottles = {};
    
    /**
     * Get an instance of bottle.
     *
     * If a name is provided the instance will be stored in a local hash.  Calling Bottle.pop multiple
     * times with the same name will return the same instance.
     *
     * @param String name
     * @return Bottle
     */
    var pop = function pop(name) {
        var instance;
        if (name) {
            instance = bottles[name];
            if (!instance) {
                bottles[name] = instance = new Bottle();
                instance.constant('BOTTLE_NAME', name);
            }
            return instance;
        }
        return new Bottle();
    };
    
    /**
     * Map of nested bottles by index => name
     *
     * @type Array
     */
    var nestedBottles = [];
    
    /**
     * Map of provider constructors by index => name
     *
     * @type Array
     */
    var providerMap = [];
    
    /**
     * Used to process decorators in the provider
     *
     * @param Object instance
     * @param Function func
     * @return Mixed
     */
    var reducer = function reducer(instance, func) {
        return func(instance);
    };
    
    /**
     * Register a provider.
     *
     * @param String fullname
     * @param Function Provider
     * @return Bottle
     */
    var provider = function provider(fullname, Provider) {
        var parts, providers, name, factory;
        providers = get(providerMap, this.id);
        parts = fullname.split('.');
        if (providers[fullname] && parts.length === 1 && !this.container[fullname + 'Provider']) {
            return console.error(fullname + ' provider already instantiated.');
        }
        providers[fullname] = true;
    
        name = parts.shift();
        factory = parts.length ? createSubProvider : createProvider;
    
        return factory.call(this, name, Provider, fullname, parts);
    };
    
    /**
     * Create the provider properties on the container
     *
     * @param String fullname
     * @param String name
     * @param Function Provider
     * @return Bottle
     */
    var createProvider = function createProvider(name, Provider) {
        var providerName, properties, container, id;
    
        id = this.id;
        container = this.container;
        providerName = name + 'Provider';
    
        properties = Object.create(null);
        properties[providerName] = {
            configurable : true,
            enumerable : true,
            get : function getProvider() {
                var instance = new Provider();
                delete container[providerName];
                container[providerName] = instance;
                return instance;
            }
        };
    
        properties[name] = {
            configurable : true,
            enumerable : true,
            get : function getService() {
                var provider = container[providerName];
                var instance;
                if (provider) {
                    // filter through decorators
                    instance = getAllWithMapped(decorators, id, name)
                        .reduce(reducer, provider.$get(container));
    
                    delete container[providerName];
                    delete container[name];
                }
                return instance === undefined ? instance : applyMiddleware(id, name, instance, container);
            }
        };
    
        Object.defineProperties(container, properties);
        return this;
    };
    
    /**
     * Creates a bottle container on the current bottle container, and registers
     * the provider under the sub container.
     *
     * @param String name
     * @param Function Provider
     * @param String fullname
     * @param Array parts
     * @return Bottle
     */
    var createSubProvider = function createSubProvider(name, Provider, fullname, parts) {
        var bottle, bottles, subname, id;
    
        id = this.id;
        bottles = get(nestedBottles, id);
        bottle = bottles[name];
        if (!bottle) {
            this.container[name] = (bottle = bottles[name] = Bottle.pop()).container;
        }
        subname = parts.join('.');
        bottle.provider(subname, Provider);
    
        set(fullnameMap, bottle.id, subname, { fullname : fullname, id : id });
    
        return this;
    };
    
    /**
     * Register a service, factory, provider, or value based on properties on the object.
     *
     * properties:
     *  * Obj.$name   String required ex: `'Thing'`
     *  * Obj.$type   String optional 'service', 'factory', 'provider', 'value'.  Default: 'service'
     *  * Obj.$inject Mixed  optional only useful with $type 'service' name or array of names
     *  * Obj.$value  Mixed  optional Normally Obj is registered on the container.  However, if this
     *                       property is included, it's value will be registered on the container
     *                       instead of the object itsself.  Useful for registering objects on the
     *                       bottle container without modifying those objects with bottle specific keys.
     *
     * @param Function Obj
     * @return Bottle
     */
    var register = function register(Obj) {
        var value = Obj.$value === undefined ? Obj : Obj.$value;
        return this[Obj.$type || 'service'].apply(this, [Obj.$name, value].concat(Obj.$inject || []));
    };
    
    
    /**
     * Execute any deferred functions
     *
     * @param Mixed data
     * @return Bottle
     */
    var resolve = function resolve(data) {
        get(deferred, this.id, '__global__').forEach(function deferredIterator(func) {
            func(data);
        });
    
        return this;
    };
    
    /**
     * Register a service inside a generic factory.
     *
     * @param String name
     * @param Function Service
     * @return Bottle
     */
    var service = function service(name, Service) {
        var deps = arguments.length > 2 ? slice.call(arguments, 2) : null;
        var bottle = this;
        return factory.call(this, name, function GenericFactory() {
            if (deps) {
                deps = deps.map(getNestedService, bottle.container);
                deps.unshift(Service);
                Service = Service.bind.apply(Service, deps);
            }
            return new Service();
        });
    };
    
    /**
     * Register a value
     *
     * @param String name
     * @param mixed val
     * @return Bottle
     */
    var value = function value(name, val) {
        var parts;
        parts = name.split('.');
        name = parts.pop();
        defineValue.call(parts.reduce(setValueObject, this.container), name, val);
        return this;
    };
    
    /**
     * Iterator for setting a plain object literal via defineValue
     *
     * @param Object container
     * @param string name
     */
    var setValueObject = function setValueObject(container, name) {
        var nestedContainer = container[name];
        if (!nestedContainer) {
            nestedContainer = {};
            defineValue.call(container, name, nestedContainer);
        }
        return nestedContainer;
    };
    
    /**
     * Define a mutable property on the container.
     *
     * @param String name
     * @param mixed val
     * @return void
     * @scope container
     */
    var defineValue = function defineValue(name, val) {
        Object.defineProperty(this, name, {
            configurable : true,
            enumerable : true,
            value : val,
            writable : true
        });
    };
    
    
    /**
     * Bottle constructor
     *
     * @param String name Optional name for functional construction
     */
    var Bottle = function Bottle(name) {
        if (!(this instanceof Bottle)) {
            return Bottle.pop(name);
        }
    
        this.id = id++;
        this.container = {
            $register : register.bind(this),
            $list : list.bind(this)
        };
    };
    
    /**
     * Bottle prototype
     */
    Bottle.prototype = {
        constant : constant,
        decorator : decorator,
        defer : defer,
        digest : digest,
        factory : factory,
        instanceFactory: instanceFactory,
        list : list,
        middleware : middleware,
        provider : provider,
        register : register,
        resolve : resolve,
        service : service,
        value : value
    };
    
    /**
     * Bottle static
     */
    Bottle.pop = pop;
    Bottle.list = list;
    
    /**
     * Global config
     */
    var globalConfig = Bottle.config = {
        strict : false
    };
    
    /**
     * Exports script adapted from lodash v2.4.1 Modern Build
     *
     * @see http://lodash.com/
     */
    
    /**
     * Valid object type map
     *
     * @type Object
     */
    var objectTypes = {
        'function' : true,
        'object' : true
    };
    
    (function exportBottle(root) {
    
        /**
         * Free variable exports
         *
         * @type Function
         */
        var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
    
        /**
         * Free variable module
         *
         * @type Object
         */
        var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
    
        /**
         * CommonJS module.exports
         *
         * @type Function
         */
        var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
    
        /**
         * Free variable `global`
         *
         * @type Object
         */
        var freeGlobal = objectTypes[typeof global] && global;
        if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
            root = freeGlobal;
        }
    
        /**
         * Export
         */
        if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
            root.Bottle = Bottle;
            define(function() { return Bottle; });
        } else if (freeExports && freeModule) {
            if (moduleExports) {
                (freeModule.exports = Bottle).Bottle = Bottle;
            } else {
                freeExports.Bottle = Bottle;
            }
        } else {
            root.Bottle = Bottle;
        }
    }((objectTypes[typeof window] && window) || this));
    
}.call(this));
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
"use strict";

/**
 * filesize
 *
 * @copyright 2016 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 3.3.0
 */
(function (global) {
	var b = /^(b|B)$/;
	var symbol = {
		iec: {
			bits: ["b", "Kib", "Mib", "Gib", "Tib", "Pib", "Eib", "Zib", "Yib"],
			bytes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
		},
		jedec: {
			bits: ["b", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"],
			bytes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
		}
	};

	/**
  * filesize
  *
  * @method filesize
  * @param  {Mixed}   arg        String, Int or Float to transform
  * @param  {Object}  descriptor [Optional] Flags
  * @return {String}             Readable file size String
  */
	function filesize(arg) {
		var descriptor = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		var result = [],
		    val = 0,
		    e = void 0,
		    base = void 0,
		    bits = void 0,
		    ceil = void 0,
		    neg = void 0,
		    num = void 0,
		    output = void 0,
		    round = void 0,
		    unix = void 0,
		    spacer = void 0,
		    standard = void 0,
		    symbols = void 0;

		if (isNaN(arg)) {
			throw new Error("Invalid arguments");
		}

		bits = descriptor.bits === true;
		unix = descriptor.unix === true;
		base = descriptor.base || 2;
		round = descriptor.round !== undefined ? descriptor.round : unix ? 1 : 2;
		spacer = descriptor.spacer !== undefined ? descriptor.spacer : unix ? "" : " ";
		symbols = descriptor.symbols || descriptor.suffixes || {};
		standard = base === 2 ? descriptor.standard || "jedec" : "jedec";
		output = descriptor.output || "string";
		e = descriptor.exponent !== undefined ? descriptor.exponent : -1;
		num = Number(arg);
		neg = num < 0;
		ceil = base > 2 ? 1000 : 1024;

		// Flipping a negative number to determine the size
		if (neg) {
			num = -num;
		}

		// Zero is now a special case because bytes divide by 1
		if (num === 0) {
			result[0] = 0;
			result[1] = unix ? "" : !bits ? "B" : "b";
		} else {
			// Determining the exponent
			if (e === -1 || isNaN(e)) {
				e = Math.floor(Math.log(num) / Math.log(ceil));

				if (e < 0) {
					e = 0;
				}
			}

			// Exceeding supported length, time to reduce & multiply
			if (e > 8) {
				e = 8;
			}

			val = base === 2 ? num / Math.pow(2, e * 10) : num / Math.pow(1000, e);

			if (bits) {
				val = val * 8;

				if (val > ceil && e < 8) {
					val = val / ceil;
					e++;
				}
			}

			result[0] = Number(val.toFixed(e > 0 ? round : 0));
			result[1] = base === 10 && e === 1 ? bits ? "kb" : "kB" : symbol[standard][bits ? "bits" : "bytes"][e];

			if (unix) {
				result[1] = standard === "jedec" ? result[1].charAt(0) : e > 0 ? result[1].replace(/B$/, "") : result[1];

				if (b.test(result[1])) {
					result[0] = Math.floor(result[0]);
					result[1] = "";
				}
			}
		}

		// Decorating a 'diff'
		if (neg) {
			result[0] = -result[0];
		}

		// Applying custom symbol
		result[1] = symbols[result[1]] || result[1];

		// Returning Array, Object, or String (default)
		if (output === "array") {
			return result;
		}

		if (output === "exponent") {
			return e;
		}

		if (output === "object") {
			return { value: result[0], suffix: result[1], symbol: result[1] };
		}

		return result.join(spacer);
	}

	// CommonJS, AMD, script tag
	if (typeof exports !== "undefined") {
		module.exports = filesize;
	} else if (typeof define === "function" && define.amd) {
		define(function () {
			return filesize;
		});
	} else {
		global.filesize = filesize;
	}
})(typeof window !== "undefined" ? window : global);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[2]);
