webpackJsonp([4],{

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_thunk__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__demo_actions__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__demo_reducers__ = __webpack_require__(22);








var store = Object(__WEBPACK_IMPORTED_MODULE_2_redux__["b" /* createStore */])(__WEBPACK_IMPORTED_MODULE_5__demo_reducers__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_2_redux__["a" /* applyMiddleware */])(__WEBPACK_IMPORTED_MODULE_3_redux_thunk___default.a));

var path = 'file1';

Object(__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
  'div',
  null,
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('button', { id: 'load', onClick: function onClick() {
      return store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_4__demo_actions__["a" /* load */])(path));
    } }),
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('button', { id: 'stop', onClick: function onClick() {
      return store.dispatch(Object(__WEBPACK_IMPORTED_MODULE_4__demo_actions__["c" /* stop */])(path));
    } })
), document.getElementById('root'));

/***/ })

},[225]);