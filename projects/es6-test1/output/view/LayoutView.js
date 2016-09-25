'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractView2 = require('./AbstractView');

var _AbstractView3 = _interopRequireDefault(_AbstractView2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LayoutView = function (_AbstractView) {
	_inherits(LayoutView, _AbstractView);

	function LayoutView() {
		_classCallCheck(this, LayoutView);

		return _possibleConstructorReturn(this, (LayoutView.__proto__ || Object.getPrototypeOf(LayoutView)).call(this));
	}

	_createClass(LayoutView, [{
		key: 'getContext',
		value: function getContext() {
			return {
				rowCount: 5
			};
		}
	}, {
		key: 'sayHi',
		value: function sayHi() {
			var name = "Bob",
			    time = "today";
			return { value: 123, output: 'Hello ' + name + ', how are you ' + time + '?' };
		}
		// template: require('./templates/layout.tpl')

	}, {
		key: 'template',
		get: function get() {
			return require('./templates/layout.hbs');
		}
	}]);

	return LayoutView;
}(_AbstractView3.default);

exports.default = LayoutView;