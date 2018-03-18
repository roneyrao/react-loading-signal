webpackJsonp([1],{

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_thunk__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__demo_actions__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__demo_reducers__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_FlexLoading__ = __webpack_require__(17);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








 // eslint-disable-line

var store = Object(__WEBPACK_IMPORTED_MODULE_2_redux__["b" /* createStore */])(__WEBPACK_IMPORTED_MODULE_5__demo_reducers__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_2_redux__["a" /* applyMiddleware */])(__WEBPACK_IMPORTED_MODULE_3_redux_thunk___default.a));

var path = 'file1';

var Local = function (_React$Component) {
  _inherits(Local, _React$Component);

  function Local() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Local);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Local.__proto__ || Object.getPrototypeOf(Local)).call.apply(_ref, [this].concat(args))), _this), _this.state = { active: false, progress: 0 }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Local, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      store.subscribe(function () {
        var state = store.getState();
        if (Object.prototype.hasOwnProperty.call(state, path)) {
          if (state[path]) {
            _this2.setState({ active: state[path].loading, progress: state[path].progress });
          } else {
            _this2.setState({ active: false, progress: 0 });
          }
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]('button', { id: 'load', onClick: function onClick() {
            return store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_4__demo_actions__["c" /* loadProgress */])(path));
          } }),
        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](
          'div',
          { id: 'box' },
          __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_6_FlexLoading__["b" /* LocalLoading */], _extends({}, this.state, {
            theme: __WEBPACK_IMPORTED_MODULE_6_FlexLoading__["c" /* Themes */].Progress,
            message: { progress: this.state.progress }
          }))
        )
      );
    }
  }]);

  return Local;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Local);


Object(__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"])(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](Local, null), document.getElementById('root'));

/***/ })

},[229]);