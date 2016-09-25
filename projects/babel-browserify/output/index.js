'use strict';

var _Model = require('./model/Model1');

var _Model2 = _interopRequireDefault(_Model);

var _layout = require('./templates/layout.tpl');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _Model2.default)();

var layout = new _layout2.default();
console.log(layout.render());