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