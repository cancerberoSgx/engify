'use strict';

var _Model = require('./model/Model1');

var _Model2 = _interopRequireDefault(_Model);

var _LayoutView = require('./view/LayoutView');

var _LayoutView2 = _interopRequireDefault(_LayoutView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _Model2.default)();

var layout = new _LayoutView2.default();
console.log(layout.render());

var _layout$sayHi = layout.sayHi();

var value = _layout$sayHi.value;
var output = _layout$sayHi.output;

console.log(output);