if(typeof global==='undefined'){this.global=this;global=this}var tool={isJJS:function(){return typeof Java==='object'},isns:function(){return typeof nlapiLoadRecord!=='undefined'},isNode:function(){return typeof console!=='undefined'},isRhino:function(){return typeof java!=='undefined'},isBrowser:function(){return false},isV7:function(){return typeof print!=='undefined'},environment:function(){var env;if(tool.isns()){env='ns'}else if(tool.isBrowser()){env='browser'}else if(tool.isV7()){env='v7'}else if(tool.isJJS()){env='jjs'}else if(tool.isRhino()){env='rhino'}else if(tool.isNode()){env='node'}return env}};engifyTool=tool;console={log:function(){var env=tool.environment();if(env==='ns'){nlapiLogExecution('DEBUG','jslog',Array.prototype.slice.call(arguments).join(', '))}else if(env==='jjs'){var System=Java.type('java.lang.System');System.out.println(Array.prototype.slice.call(arguments).join(', '))}else if(env==='rhino'){java.lang.System.out.println(Array.prototype.slice.call(arguments).join(', '))}else if(env==='node'){console.log.apply(console,arguments)}else if(env==='browser'){console.log.apply(console,arguments)}else if(env==='v7'){print.apply(this,arguments)}}};console.error=console.log; 

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var diff = "diff --git a/.gitignore b/.gitignore\nnew file mode 100644\nindex 0000000..3c3629e\n--- /dev/null\n+++ b/.gitignore\n@@ -0,0 +1 @@\n+node_modules\ndiff --git a/package.json b/package.json\nindex 3d227d7..5d8c6e2 100644\n--- a/package.json\n+++ b/package.json\n@@ -9,8 +9,7 @@\n   \"author\": \"\",\n   \"license\": \"ISC\",\n   \"dependencies\": {\n-    \"parse-diff\": \"^0.3.2\",\n-    \"shelljs\": \"^0.7.3\"\n+    \"parse-diff\": \"^0.3.2\"\n   },\n   \"devDependencies\": {\n     \"handlebars\": \"^4.0.5\",\ndiff --git a/src/application/Application.js b/src/application/Application.js\nindex 47bd1c2..a0e189d 100644\n--- a/src/application/Application.js\n+++ b/src/application/Application.js\n@@ -27,6 +27,10 @@ _.extend(Application.prototype, {\n \t{\n \t\tthis.diff = diffUtils.parseDiff(content)\n \t}\n+,\tgetDiff: function()\n+\t{\n+\t\treturn this.diff\n+\t}\n })\n \n module.exports = Application\n\\ No newline at end of file\ndiff --git a/src/application/Workspace.js b/src/application/Workspace.js\nnew file mode 100644\nindex 0000000..16ecf73\n--- /dev/null\n+++ b/src/application/Workspace.js\n@@ -0,0 +1,9 @@\n+var Workspace = function(){}\n+var _ = require('../lib/underscore')\n+\n+_.extend(Workspace.prototype, {\n+\t\n+})\n+Workspace.instance = new Workspace()\n+\n+module.exports = Workspace;\n\\ No newline at end of file\ndiff --git a/src/template/editor/workspace.hbs b/src/template/editor/workspace.hbs\nindex f69f5c3..f2b17ac 100644\n--- a/src/template/editor/workspace.hbs\n+++ b/src/template/editor/workspace.hbs\n@@ -2,4 +2,6 @@ workspace! <a href=\"#openFile\">open file</a>\n \n <div data-view=\"file-tree\"></div>\n \n+<div data-view=\"file-editor\"></div>\n+\n end workspace\n\\ No newline at end of file\ndiff --git a/src/utils/DiffUtils.js b/src/utils/DiffUtils.js\nindex 0498b94..0952dc8 100644\n--- a/src/utils/DiffUtils.js\n+++ b/src/utils/DiffUtils.js\n@@ -9,13 +9,11 @@ module.exports = {\n \t\tvar tree = this.pathsToTree(filePaths)\n \t\tthis.visitTreeNodes(tree, function(n)\n \t\t{\n-\t\t\t// console.log('visittreenodes', n)\n \t\t\tn.data = _.find(files, function(f){return f.from===n.id})\n+\t\t\t// n.children = n.children && n.children.length ? n.children : undefined\n+\t\t\tn.text = n.name; //for jstree\n \t\t})\n-\t\t\n-\t\tconsole.log(tree)\n-\t\t// this.parseFilePath(files[0].from)\n-\t\t// _.each(parsed, (p)=>{diffUtils.parseFilePath(p.from)})\n+\t\treturn tree;\n \t}\n \n \n@@ -35,7 +33,8 @@ module.exports = {\n // \t}\n \n \n-\t// path strings to tree structure utility: pathToTree\n+\t// path strings to tree structure utility: pathsToTree. input is an array of string file paths. \n+\t// Given paths will be 'normalized' to unix. The output is a tree structure\n \n ,\tfolderSep: '/'\n \n@@ -55,7 +54,7 @@ module.exports = {\n \t\t\t\t\tinner.push(arr[j])\n \t\t\t\t}\n \t\t\t\tvar file = inner.join(self.folderSep)\n-\t\t\t\ttree[file] = tree[file] || {id: file, text: file, children: []}\n+\t\t\t\ttree[file] = tree[file] || {id: file, name: inner[inner.length-1], children: []}\n \t\t\t}\n \t\t})\n \t\t//now we assign parentship in 'children' property. Also find the root node\ndiff --git a/src/view/editor/FileTreeView.js b/src/view/editor/FileTreeView.js\nindex b58bb7f..db12bef 100644\n--- a/src/view/editor/FileTreeView.js\n+++ b/src/view/editor/FileTreeView.js\n@@ -6,29 +6,35 @@ module.exports = AbstractView.extend({\n \n \ttemplate: require('../../template/editor/filetree.hbs')\n \n+,\ttreeSelectionHandler: function(e, data)\n+\t{\n+\t\tvar model = data.node;\n+\t\tthis.workspace\n+\n+\t\tconsole.log(data, e);\n+\t\t\t// console.log(data.selected);\n+\t}\n+\n ,\tafterRender: function()\n \t{\n \t\tthis.diff = this.application.getDiff()\n+\t\tif(!this.diff)\n+\t\t{\n+\t\t\tBackbone.history.navigate('openFile', {trigger: true})\n+\t\t\talert('You have to choose a diff file first.')\n+\t\t}\n+\n+\t\tvar data = [this.diff];\n+\n \n \t\tthis.$('[data-type=\"tree\"]').jstree({\n \t\t\t'core' : {\n-\t\t\t\t'data' : [this.diff]\n-\t\t\t\t// [\n-\t\t\t\t// \t{ \"text\" : \"Root node\", \"children\" : [\n-\t\t\t\t// \t\t\t{ \"text\" : \"Child node 1\" },\n-\t\t\t\t// \t\t\t{ \"text\" : \"Child node 2\" }\n-\t\t\t\t// \t\t]\n-\t\t\t\t// \t}\n-\t\t\t\t// ]\n+\t\t\t\t'data' : data\n \t\t\t}\n \t\t});\n \n-\n-\t\tthis.$('[data-type=\"tree\"]').on(\"changed.jstree\", function (e, data) \n-\t\t {\n-\t\t\tconsole.log(\"The selected nodes are:\");\n-\t\t\tconsole.log(data.selected);\n-\t\t});\n+\t\t//backbone events won't work for this binding:\n+\t\tthis.$('[data-type=\"tree\"]').on(\"changed.jstree\", _.bind(this.treeSelectionHandler, this))\n \t}\n \n })\n\\ No newline at end of file\ndiff --git a/src/view/editor/WorkspaceView.js b/src/view/editor/WorkspaceView.js\nindex a192680..9c33851 100644\n--- a/src/view/editor/WorkspaceView.js\n+++ b/src/view/editor/WorkspaceView.js\n@@ -13,5 +13,14 @@ module.exports = AbstractView.extend({\n \t\t\tview.application = parentView.application\n \t\t\treturn view;\n \t\t}\n+\n+\t,\t'file-editor': function(parentView)\n+\t\t{\n+\t\t\tvar view = new FileTreeView()\n+\t\t\tview.application = parentView.application\n+\t\t\treturn view;\n+\t\t}\n+\n+\t\t\n \t}\n })\n\\ No newline at end of file\ndiff --git a/static/bundle.js b/static/bundle.js\nindex 86e20ec..9f100dd 100644\n--- a/static/bundle.js\n+++ b/static/bundle.js\n@@ -1322,6 +1322,10 @@ _.extend(Application.prototype, {\n \t{\n \t\tthis.diff = diffUtils.parseDiff(content)\n \t}\n+,\tgetDiff: function()\n+\t{\n+\t\treturn this.diff\n+\t}\n })\n \n module.exports = Application\n@@ -1367,7 +1371,7 @@ module.exports = HandlebarsCompiler.template({\"compiler\":[7,\">= 4.0.0\"],\"main\":f\n // hbsfy compiled Handlebars template\n var HandlebarsCompiler = require('hbsfy/runtime');\n module.exports = HandlebarsCompiler.template({\"compiler\":[7,\">= 4.0.0\"],\"main\":function(container,depth0,helpers,partials,data) {\n-    return \"workspace! <a href=\\\"#openFile\\\">open file</a>\\n\\n<div data-view=\\\"file-tree\\\"></div>\\n\\nend workspace\";\n+    return \"workspace! <a href=\\\"#openFile\\\">open file</a>\\n\\n<div data-view=\\\"file-tree\\\"></div>\\n\\n<div data-view=\\\"file-editor\\\"></div>\\n\\nend workspace\";\n },\"useData\":true});\n \n },{\"hbsfy/runtime\":20}],29:[function(require,module,exports){\n@@ -1389,13 +1393,11 @@ module.exports = {\n \t\tvar tree = this.pathsToTree(filePaths)\n \t\tthis.visitTreeNodes(tree, function(n)\n \t\t{\n-\t\t\t// console.log('visittreenodes', n)\n \t\t\tn.data = _.find(files, function(f){return f.from===n.id})\n+\t\t\t// n.children = n.children && n.children.length ? n.children : undefined\n+\t\t\tn.text = n.name; //for jstree\n \t\t})\n-\t\t\n-\t\tconsole.log(tree)\n-\t\t// this.parseFilePath(files[0].from)\n-\t\t// _.each(parsed, (p)=>{diffUtils.parseFilePath(p.from)})\n+\t\treturn tree;\n \t}\n \n \n@@ -1415,7 +1417,8 @@ module.exports = {\n // \t}\n \n \n-\t// path strings to tree structure utility: pathToTree\n+\t// path strings to tree structure utility: pathsToTree. input is an array of string file paths. \n+\t// Given paths will be 'normalized' to unix. The output is a tree structure\n \n ,\tfolderSep: '/'\n \n@@ -1435,7 +1438,7 @@ module.exports = {\n \t\t\t\t\tinner.push(arr[j])\n \t\t\t\t}\n \t\t\t\tvar file = inner.join(self.folderSep)\n-\t\t\t\ttree[file] = tree[file] || {id: file, children: []}\n+\t\t\t\ttree[file] = tree[file] || {id: file, name: inner[inner.length-1], children: []}\n \t\t\t}\n \t\t})\n \t\t//now we assign parentship in 'children' property. Also find the root node\n@@ -1497,11 +1500,11 @@ module.exports = Backbone.View.extend({\n \t\t\t}\n \t\t})\n \t}\n-,\trenderIn: function($el)\n-\t{\n-\t\tthis.$el = $el\n-\t\tthis.render()\n-\t}\n+// ,\trenderIn: function($el)\n+// \t{\n+// \t\tthis.$el = $el\n+// \t\tthis.render()\n+// \t}\n \n ,\ttemplate: function()\n \t{\n@@ -1563,26 +1566,35 @@ module.exports = AbstractView.extend({\n \n \ttemplate: require('../../template/editor/filetree.hbs')\n \n+,\ttreeSelectionHandler: function(e, data)\n+\t{\n+\t\tvar model = data.node;\n+\t\tthis.workspace\n+\n+\t\tconsole.log(data, e);\n+\t\t\t// console.log(data.selected);\n+\t}\n+\n ,\tafterRender: function()\n \t{\n+\t\tthis.diff = this.application.getDiff()\n+\t\tif(!this.diff)\n+\t\t{\n+\t\t\tBackbone.history.navigate('openFile', {trigger: true})\n+\t\t\talert('You have to choose a diff file first.')\n+\t\t}\n+\n+\t\tvar data = [this.diff];\n+\n+\n \t\tthis.$('[data-type=\"tree\"]').jstree({\n \t\t\t'core' : {\n-\t\t\t\t'data' : [\n-\t\t\t\t\t{ \"text\" : \"Root node\", \"children\" : [\n-\t\t\t\t\t\t\t{ \"text\" : \"Child node 1\" },\n-\t\t\t\t\t\t\t{ \"text\" : \"Child node 2\" }\n-\t\t\t\t\t\t]\n-\t\t\t\t\t}\n-\t\t\t\t]\n+\t\t\t\t'data' : data\n \t\t\t}\n \t\t});\n \n-\n-\t\tthis.$('[data-type=\"tree\"]').on(\"changed.jstree\", function (e, data) \n-\t\t {\n-\t\t\tconsole.log(\"The selected nodes are:\");\n-\t\t\tconsole.log(data.selected);\n-\t\t});\n+\t\t//backbone events won't work for this binding:\n+\t\tthis.$('[data-type=\"tree\"]').on(\"changed.jstree\", _.bind(this.treeSelectionHandler, this))\n \t}\n \n })\n@@ -1602,6 +1614,15 @@ module.exports = AbstractView.extend({\n \t\t\tview.application = parentView.application\n \t\t\treturn view;\n \t\t}\n+\n+\t,\t'file-editor': function(parentView)\n+\t\t{\n+\t\t\tvar view = new FileTreeView()\n+\t\t\tview.application = parentView.application\n+\t\t\treturn view;\n+\t\t}\n+\n+\t\t\n \t}\n })\n },{\"../../lib/underscore\":26,\"../../template/editor/workspace.hbs\":28,\"../../view/AbstractView\":31,\"./FileTreeView\":33}],35:[function(require,module,exports){\n";
// console.log(diff);


var parse = require('parse-diff');
// var diff = ''; // input diff string 
var files = parse(diff);
console.log(files.length); // number of patched files 
files.forEach(function(file) {
	// console.log(JSON.stringify(file))
    // console.log(file.chunks.length); // number of hunks 
    // console.log(file.chunks[0].changes.length) // hunk added/deleted/context lines 
    // // each item in changes is a string 
    // console.log(file.deletions); // number of deletions in the patch 
    // console.log(file.additions); // number of additions in the patch 
});


},{"parse-diff":2}],2:[function(require,module,exports){
var defaultToWhiteSpace, escapeRegExp, ltrim, makeString, parseFile, parseFileFallback, trimLeft;

module.exports = function(input) {
  var add, chunk, current, del, deleted_file, file, files, from_file, index, j, len, line, lines, ln_add, ln_del, new_file, noeol, normal, parse, restart, schema, start, to_file;
  if (!input) {
    return [];
  }
  if (input.match(/^\s+$/)) {
    return [];
  }
  lines = input.split('\n');
  if (lines.length === 0) {
    return [];
  }
  files = [];
  file = null;
  ln_del = 0;
  ln_add = 0;
  current = null;
  start = function(line) {
    var fileNames;
    file = {
      chunks: [],
      deletions: 0,
      additions: 0
    };
    files.push(file);
    if (!file.to && !file.from) {
      fileNames = parseFile(line);
      if (fileNames) {
        file.from = fileNames[0];
        return file.to = fileNames[1];
      }
    }
  };
  restart = function() {
    if (!file || file.chunks.length) {
      return start();
    }
  };
  new_file = function() {
    restart();
    file["new"] = true;
    return file.from = '/dev/null';
  };
  deleted_file = function() {
    restart();
    file.deleted = true;
    return file.to = '/dev/null';
  };
  index = function(line) {
    restart();
    return file.index = line.split(' ').slice(1);
  };
  from_file = function(line) {
    restart();
    return file.from = parseFileFallback(line);
  };
  to_file = function(line) {
    restart();
    return file.to = parseFileFallback(line);
  };
  chunk = function(line, match) {
    var newLines, newStart, oldLines, oldStart;
    ln_del = oldStart = +match[1];
    oldLines = +(match[2] || 0);
    ln_add = newStart = +match[3];
    newLines = +(match[4] || 0);
    current = {
      content: line,
      changes: [],
      oldStart: oldStart,
      oldLines: oldLines,
      newStart: newStart,
      newLines: newLines
    };
    return file.chunks.push(current);
  };
  del = function(line) {
    current.changes.push({
      type: 'del',
      del: true,
      ln: ln_del++,
      content: line
    });
    return file.deletions++;
  };
  add = function(line) {
    current.changes.push({
      type: 'add',
      add: true,
      ln: ln_add++,
      content: line
    });
    return file.additions++;
  };
  noeol = '\\ No newline at end of file';
  normal = function(line) {
    if (!file) {
      return;
    }
    return current.changes.push({
      type: 'normal',
      normal: true,
      ln1: line !== noeol ? ln_del++ : void 0,
      ln2: line !== noeol ? ln_add++ : void 0,
      content: line
    });
  };
  schema = [[/^\s+/, normal], [/^diff\s/, start], [/^new file mode \d+$/, new_file], [/^deleted file mode \d+$/, deleted_file], [/^index\s[\da-zA-Z]+\.\.[\da-zA-Z]+(\s(\d+))?$/, index], [/^---\s/, from_file], [/^\+\+\+\s/, to_file], [/^@@\s+\-(\d+),?(\d+)?\s+\+(\d+),?(\d+)?\s@@/, chunk], [/^-/, del], [/^\+/, add]];
  parse = function(line) {
    var j, len, m, p;
    for (j = 0, len = schema.length; j < len; j++) {
      p = schema[j];
      m = line.match(p[0]);
      if (m) {
        p[1](line, m);
        return true;
      }
    }
    return false;
  };
  for (j = 0, len = lines.length; j < len; j++) {
    line = lines[j];
    parse(line);
  }
  return files;
};

parseFile = function(s) {
  var fileNames;
  if (!s) {
    return;
  }
  fileNames = s.split(' ').slice(-2);
  fileNames.map(function(fileName, i) {
    return fileNames[i] = fileName.replace(/^(a|b)\//, '');
  });
  return fileNames;
};

parseFileFallback = function(s) {
  var t;
  s = ltrim(s, '-');
  s = ltrim(s, '+');
  s = s.trim();
  t = /\t.*|\d{4}-\d\d-\d\d\s\d\d:\d\d:\d\d(.\d+)?\s(\+|-)\d\d\d\d/.exec(s);
  if (t) {
    s = s.substring(0, t.index).trim();
  }
  if (s.match(/^(a|b)\//)) {
    return s.substr(2);
  } else {
    return s;
  }
};

ltrim = function(s, chars) {
  s = makeString(s);
  if (!chars && trimLeft) {
    return trimLeft.call(s);
  }
  chars = defaultToWhiteSpace(chars);
  return s.replace(new RegExp('^' + chars + '+'), '');
};

makeString = function(s) {
  if (s === null) {
    return '';
  } else {
    return s + '';
  }
};

trimLeft = String.prototype.trimLeft;

defaultToWhiteSpace = function(chars) {
  if (chars === null) {
    return '\\s';
  }
  if (chars.source) {
    return chars.source;
  }
  return '[' + escapeRegExp(chars) + ']';
};

escapeRegExp = function(s) {
  return makeString(s).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};

},{}]},{},[1]);
