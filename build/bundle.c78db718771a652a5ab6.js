/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/actions/index.js":
/*!**********************************!*\
  !*** ./src/app/actions/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.USER_AUTH = exports.USER_REGISTER = undefined;
exports.user_register_action = user_register_action;
exports.user_auth_action = user_auth_action;

var _axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ACTIONS TYPES 
var USER_REGISTER = exports.USER_REGISTER = 'USER_REGISTER';
var USER_AUTH = exports.USER_AUTH = 'USER_AUTH';

// ACTIONS CREATORS
function user_register_action(user_infos) {

    // With THUNK
    return function (dispatch) {
        return _axios2.default.post('http://localhost/senovea/wp-json/wp/v2/users/register', {
            username: user_infos.register_username,
            email: user_infos.register_email,
            password: user_infos.register_password
        }).then(function (response) {
            console.log("response");
            console.log(response);

            dispatch({
                'type': USER_REGISTER,
                'payload': response
            });
        }).catch(function (error) {
            console.log("error");
            console.log(error.response);

            dispatch({
                'type': USER_REGISTER,
                'payload': error.response
            });
        });
    };
}

function user_auth_action(user_infos) {

    console.log("action creator");
    console.log(user_infos);

    return {
        'type': USER_AUTH,
        'payload': {}
    };
}

/***/ }),

/***/ "./src/app/reducers/reducers.js":
/*!**************************************!*\
  !*** ./src/app/reducers/reducers.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rootReducers = undefined;

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _reduxForm = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");

var _index = __webpack_require__(/*! ../actions/index */ "./src/app/actions/index.js");

function user() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    return state;
}

function auth() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _index.USER_REGISTER:
            console.log("action");
            console.log(action);
            return state;
        default:
            return state;
    }
}

var rootReducers = exports.rootReducers = (0, _redux.combineReducers)({
    "user": user,
    "auth": auth,
    "form": _reduxForm.reducer
});

/***/ }),

/***/ "./src/app/screens/home.js":
/*!*********************************!*\
  !*** ./src/app/screens/home.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Home = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = exports.Home = function (_React$Component) {
    _inherits(Home, _React$Component);

    function Home() {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
    }

    _createClass(Home, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                'Homepage'
            );
        }
    }]);

    return Home;
}(_react2.default.Component);

/***/ }),

/***/ "./src/app/screens/login.js":
/*!**********************************!*\
  !*** ./src/app/screens/login.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _reduxForm = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");

var _index = __webpack_require__(/*! ../actions/index */ "./src/app/actions/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// user auth action 


var LogIn = function (_React$Component) {
    _inherits(LogIn, _React$Component);

    function LogIn(props) {
        _classCallCheck(this, LogIn);

        var _this = _possibleConstructorReturn(this, (LogIn.__proto__ || Object.getPrototypeOf(LogIn)).call(this, props));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(LogIn, [{
        key: 'handleSubmit',
        value: function handleSubmit(formProps) {
            console.log("submit");
            console.log(formProps);

            // Calling login action
            this.props.user_auth_action(formProps);
        }
    }, {
        key: 'render',
        value: function render() {
            //console.log(this.props)
            //console.log(this.state)
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h1',
                    null,
                    ' Log In '
                ),
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.props.handleSubmit(this.handleSubmit) },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'label',
                            null,
                            'user_name'
                        ),
                        _react2.default.createElement(_reduxForm.Field, {
                            name: 'login_username',
                            id: 'login_username',
                            component: 'input',
                            type: 'text',
                            placeholder: 'username'
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'label',
                            null,
                            'password'
                        ),
                        _react2.default.createElement(_reduxForm.Field, {
                            name: 'login_password',
                            id: 'login_password',
                            component: 'input',
                            type: 'password'
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'button',
                            { type: 'submit' },
                            'login to the app !'
                        )
                    )
                )
            );
        }
    }]);

    return LogIn;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {
        "user": state.user
    };
}

function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)({
        "user_auth_action": _index.user_auth_action
    }, dispatch);
}

exports.default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _reduxForm.reduxForm)({
    form: 'loginForm'
}))(LogIn);

/***/ }),

/***/ "./src/app/screens/logout.js":
/*!***********************************!*\
  !*** ./src/app/screens/logout.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LogOut = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LogOut = exports.LogOut = function (_React$Component) {
    _inherits(LogOut, _React$Component);

    function LogOut() {
        _classCallCheck(this, LogOut);

        return _possibleConstructorReturn(this, (LogOut.__proto__ || Object.getPrototypeOf(LogOut)).apply(this, arguments));
    }

    _createClass(LogOut, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h1',
                    null,
                    ' Log Out '
                )
            );
        }
    }]);

    return LogOut;
}(_react2.default.Component);

/***/ }),

/***/ "./src/app/screens/register.js":
/*!*************************************!*\
  !*** ./src/app/screens/register.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _reduxForm = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");

var _index = __webpack_require__(/*! ../actions/index */ "./src/app/actions/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// user auth action 


var Register = function (_React$Component) {
    _inherits(Register, _React$Component);

    function Register(props) {
        _classCallCheck(this, Register);

        var _this = _possibleConstructorReturn(this, (Register.__proto__ || Object.getPrototypeOf(Register)).call(this, props));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(Register, [{
        key: 'handleSubmit',
        value: function handleSubmit(formProps) {
            console.log('handlesubmit');
            console.log(formProps);

            // Calling register action
            this.props.user_register_action(formProps);
        }
    }, {
        key: 'render',
        value: function render() {
            console.log(this.props);
            console.log(this.state);

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h1',
                    null,
                    ' Register '
                ),
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.props.handleSubmit(this.handleSubmit) },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'label',
                            null,
                            'user_email'
                        ),
                        _react2.default.createElement(_reduxForm.Field, {
                            name: 'register_email',
                            id: 'register_email',
                            component: 'input',
                            type: 'text',
                            placeholder: 'email'
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'label',
                            null,
                            'user_name'
                        ),
                        _react2.default.createElement(_reduxForm.Field, {
                            name: 'register_username',
                            id: 'register_username',
                            component: 'input',
                            type: 'text',
                            placeholder: 'username'
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'label',
                            null,
                            'password'
                        ),
                        _react2.default.createElement(_reduxForm.Field, {
                            name: 'register_password',
                            id: 'register_password',
                            component: 'input',
                            type: 'password'
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'button',
                            { type: 'submit' },
                            'register to the app !'
                        )
                    )
                )
            );
        }
    }]);

    return Register;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {
        "user": state.user
    };
}

function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)({
        "user_register_action": _index.user_register_action
    }, dispatch);
}

exports.default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _reduxForm.reduxForm)({
    form: 'registerForm'
}))(Register);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _reducers = __webpack_require__(/*! ./app/reducers/reducers */ "./src/app/reducers/reducers.js");

var _reduxThunk = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/lib/index.js");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _home = __webpack_require__(/*! ./app/screens/home */ "./src/app/screens/home.js");

var _register = __webpack_require__(/*! ./app/screens/register */ "./src/app/screens/register.js");

var _register2 = _interopRequireDefault(_register);

var _login = __webpack_require__(/*! ./app/screens/login */ "./src/app/screens/login.js");

var _login2 = _interopRequireDefault(_login);

var _logout = __webpack_require__(/*! ./app/screens/logout */ "./src/app/screens/logout.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // react 

// react-router-dom

// react-redux 

// redux 

// redux - thunk 


// screens components


var store = (0, _redux.createStore)(_reducers.rootReducers, (0, _redux.applyMiddleware)(_reduxThunk2.default));

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                _react2.default.createElement(
                    _reactRouterDom.HashRouter,
                    null,
                    _react2.default.createElement(
                        _reactRouterDom.Switch,
                        null,
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _home.Home }),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/register', component: _register2.default }),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/login', component: _login2.default }),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/logout', component: _logout.LogOut })
                    )
                )
            );
        }
    }]);

    return App;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.querySelector('#root'));

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9hY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvcmVkdWNlcnMvcmVkdWNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JlZW5zL2hvbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JlZW5zL2xvZ2luLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvc2NyZWVucy9sb2dvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9zY3JlZW5zL3JlZ2lzdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ1c2VyX3JlZ2lzdGVyX2FjdGlvbiIsInVzZXJfYXV0aF9hY3Rpb24iLCJVU0VSX1JFR0lTVEVSIiwiVVNFUl9BVVRIIiwidXNlcl9pbmZvcyIsImRpc3BhdGNoIiwiYXhpb3MiLCJwb3N0IiwidXNlcm5hbWUiLCJyZWdpc3Rlcl91c2VybmFtZSIsImVtYWlsIiwicmVnaXN0ZXJfZW1haWwiLCJwYXNzd29yZCIsInJlZ2lzdGVyX3Bhc3N3b3JkIiwidGhlbiIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZXJyb3IiLCJ1c2VyIiwic3RhdGUiLCJhY3Rpb24iLCJhdXRoIiwidHlwZSIsInJvb3RSZWR1Y2VycyIsImZvcm1SZWR1Y2VyIiwiSG9tZSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiTG9nSW4iLCJwcm9wcyIsImhhbmRsZVN1Ym1pdCIsImJpbmQiLCJmb3JtUHJvcHMiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJmb3JtIiwiTG9nT3V0IiwiUmVnaXN0ZXIiLCJzdG9yZSIsInRodW5rIiwiQXBwIiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtB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ZS5jNzhkYjcxODc3MWE2NTJhNWFiNi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJidW5kbGVcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9zcmMvaW5kZXguanNcIixcInZlbmRvcnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXG5cbi8vIEFDVElPTlMgVFlQRVMgXG5leHBvcnQgY29uc3QgVVNFUl9SRUdJU1RFUiAgPSAnVVNFUl9SRUdJU1RFUidcbmV4cG9ydCBjb25zdCBVU0VSX0FVVEggPSAnVVNFUl9BVVRIJ1xuXG4vLyBBQ1RJT05TIENSRUFUT1JTXG5leHBvcnQgZnVuY3Rpb24gdXNlcl9yZWdpc3Rlcl9hY3Rpb24oIHVzZXJfaW5mb3MgKXtcblxuICAgIC8vIFdpdGggVEhVTktcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KCdodHRwOi8vbG9jYWxob3N0L3Nlbm92ZWEvd3AtanNvbi93cC92Mi91c2Vycy9yZWdpc3Rlcicse1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lOnVzZXJfaW5mb3MucmVnaXN0ZXJfdXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgZW1haWw6dXNlcl9pbmZvcy5yZWdpc3Rlcl9lbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDp1c2VyX2luZm9zLnJlZ2lzdGVyX3Bhc3N3b3JkLFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXNwb25zZVwiKVxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG5cbiAgICAgICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAndHlwZSc6VVNFUl9SRUdJU1RFUixcbiAgICAgICAgICAgICAgICAncGF5bG9hZCc6IHJlc3BvbnNlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIilcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnJlc3BvbnNlKVxuXG4gICAgICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgJ3R5cGUnOlVTRVJfUkVHSVNURVIsXG4gICAgICAgICAgICAgICAgJ3BheWxvYWQnOiBlcnJvci5yZXNwb25zZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VyX2F1dGhfYWN0aW9uKCB1c2VyX2luZm9zICl7XG5cbiAgICBjb25zb2xlLmxvZyhcImFjdGlvbiBjcmVhdG9yXCIpXG4gICAgY29uc29sZS5sb2codXNlcl9pbmZvcylcblxuICAgIHJldHVybiB7XG4gICAgICAgICd0eXBlJzpVU0VSX0FVVEgsXG4gICAgICAgICdwYXlsb2FkJzp7XG5cbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9ICAgICAgICAgIGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgcmVkdWNlciBhcyBmb3JtUmVkdWNlciB9ICAgZnJvbSAncmVkdXgtZm9ybSdcbmltcG9ydCB7IFVTRVJfUkVHSVNURVIgfSAgICAgICAgICAgICAgICBmcm9tICcuLi9hY3Rpb25zL2luZGV4J1xuXG5mdW5jdGlvbiB1c2VyKCBzdGF0ZT17fSwgYWN0aW9uICl7XG4gICAgcmV0dXJuIHN0YXRlXG59XG5cbmZ1bmN0aW9uIGF1dGgoIHN0YXRlPXt9LCBhY3Rpb24gKXtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgVVNFUl9SRUdJU1RFUjpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0aW9uXCIpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhY3Rpb24pXG4gICAgICAgICAgICByZXR1cm4gc3RhdGVcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJvb3RSZWR1Y2VycyA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gICAgXCJ1c2VyXCI6dXNlcixcbiAgICBcImF1dGhcIjphdXRoLFxuICAgIFwiZm9ybVwiOmZvcm1SZWR1Y2VyXG59KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBjbGFzcyBIb21lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8ZGl2PkhvbWVwYWdlPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59IiwiaW1wb3J0IFJlYWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbXBvc2UsIGJpbmRBY3Rpb25DcmVhdG9ycyB9ICAgICAgZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0IH0gICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgRmllbGQsIHJlZHV4Rm9ybSB9ICAgICAgICAgICAgICAgICBmcm9tICdyZWR1eC1mb3JtJ1xuXG4vLyB1c2VyIGF1dGggYWN0aW9uIFxuaW1wb3J0IHsgdXNlcl9hdXRoX2FjdGlvbiB9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnIFxuXG5jbGFzcyBMb2dJbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLmhhbmRsZVN1Ym1pdCA9IHRoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcylcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXQoZm9ybVByb3BzKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdWJtaXRcIilcbiAgICAgICAgY29uc29sZS5sb2coZm9ybVByb3BzKVxuXG4gICAgICAgIC8vIENhbGxpbmcgbG9naW4gYWN0aW9uXG4gICAgICAgIHRoaXMucHJvcHMudXNlcl9hdXRoX2FjdGlvbihmb3JtUHJvcHMpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5wcm9wcylcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnN0YXRlKVxuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMT4gTG9nIEluIDwvaDE+XG4gICAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMucHJvcHMuaGFuZGxlU3VibWl0KHRoaXMuaGFuZGxlU3VibWl0KX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+dXNlcl9uYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJsb2dpbl91c2VybmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJsb2dpbl91c2VybmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50PVwiaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInVzZXJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnBhc3N3b3JkPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJsb2dpbl9wYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJsb2dpbl9wYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50PVwiaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPmxvZ2luIHRvIHRoZSBhcHAgITwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKXtcbiAgICByZXR1cm4ge1xuICAgICAgICBcInVzZXJcIjpzdGF0ZS51c2VyXG4gICAgfVxufVxuXG5mdW5jdGlvbiBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gpe1xuICAgIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcnMoe1xuICAgICAgICBcInVzZXJfYXV0aF9hY3Rpb25cIjp1c2VyX2F1dGhfYWN0aW9uXG4gICAgfSwgZGlzcGF0Y2gpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvc2UoXG4gICAgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcyksXG4gICAgcmVkdXhGb3JtKHtcbiAgICAgICAgZm9ybTonbG9naW5Gb3JtJ1xuICAgIH0pXG4pKExvZ0luKSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGNsYXNzIExvZ091dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDE+IExvZyBPdXQgPC9oMT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufSIsImltcG9ydCBSZWFjdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb21wb3NlLCBiaW5kQWN0aW9uQ3JlYXRvcnMgfSAgICAgIGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgY29ubmVjdCB9ICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IEZpZWxkLCByZWR1eEZvcm0gfSAgICAgICAgICAgICAgICAgZnJvbSAncmVkdXgtZm9ybSdcblxuLy8gdXNlciBhdXRoIGFjdGlvbiBcbmltcG9ydCB7IHVzZXJfcmVnaXN0ZXJfYWN0aW9uIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmRleCcgXG5cbmNsYXNzIFJlZ2lzdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuaGFuZGxlU3VibWl0ID0gdGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKVxuICAgIH1cblxuICAgIGhhbmRsZVN1Ym1pdChmb3JtUHJvcHMpe1xuICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlc3VibWl0JylcbiAgICAgICAgY29uc29sZS5sb2coZm9ybVByb3BzKVxuXG4gICAgICAgIC8vIENhbGxpbmcgcmVnaXN0ZXIgYWN0aW9uXG4gICAgICAgIHRoaXMucHJvcHMudXNlcl9yZWdpc3Rlcl9hY3Rpb24oZm9ybVByb3BzKVxuICAgIH0gICBcblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzKVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKVxuXG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGgxPiBSZWdpc3RlciA8L2gxPlxuICAgICAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLnByb3BzLmhhbmRsZVN1Ym1pdCh0aGlzLmhhbmRsZVN1Ym1pdCl9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnVzZXJfZW1haWw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInJlZ2lzdGVyX2VtYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cInJlZ2lzdGVyX2VtYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ9XCJpbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+dXNlcl9uYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJyZWdpc3Rlcl91c2VybmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJyZWdpc3Rlcl91c2VybmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50PVwiaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInVzZXJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPnBhc3N3b3JkPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGaWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJyZWdpc3Rlcl9wYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJyZWdpc3Rlcl9wYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50PVwiaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPnJlZ2lzdGVyIHRvIHRoZSBhcHAgITwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0YXRlKXtcbiAgICByZXR1cm4ge1xuICAgICAgICBcInVzZXJcIjpzdGF0ZS51c2VyXG4gICAgfVxufVxuXG5mdW5jdGlvbiBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gpe1xuICAgIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcnMoe1xuICAgICAgICBcInVzZXJfcmVnaXN0ZXJfYWN0aW9uXCI6dXNlcl9yZWdpc3Rlcl9hY3Rpb25cbiAgICB9LCBkaXNwYXRjaClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcG9zZShcbiAgICBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKSxcbiAgICByZWR1eEZvcm0oe1xuICAgICAgICBmb3JtOidyZWdpc3RlckZvcm0nXG4gICAgfSlcbikoUmVnaXN0ZXIpIiwiLy8gcmVhY3QgXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuLy8gcmVhY3Qtcm91dGVyLWRvbVxuaW1wb3J0IHsgSGFzaFJvdXRlciwgU3dpdGNoLCBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG4vLyByZWFjdC1yZWR1eCBcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnXG4vLyByZWR1eCBcbmltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IHJvb3RSZWR1Y2VycyB9IGZyb20gJy4vYXBwL3JlZHVjZXJzL3JlZHVjZXJzJ1xuLy8gcmVkdXggLSB0aHVuayBcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcblxuLy8gc2NyZWVucyBjb21wb25lbnRzXG5pbXBvcnQgeyBIb21lIH0gZnJvbSAnLi9hcHAvc2NyZWVucy9ob21lJ1xuaW1wb3J0IFJlZ2lzdGVyIGZyb20gJy4vYXBwL3NjcmVlbnMvcmVnaXN0ZXInXG5pbXBvcnQgTG9nSW4gZnJvbSAnLi9hcHAvc2NyZWVucy9sb2dpbidcbmltcG9ydCB7IExvZ091dCB9IGZyb20gJy4vYXBwL3NjcmVlbnMvbG9nb3V0J1xuXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxuICAgIHJvb3RSZWR1Y2VycyxcbiAgICBhcHBseU1pZGRsZXdhcmUodGh1bmspXG4pXG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgICAgICAgPEhhc2hSb3V0ZXI+XG4gICAgICAgICAgICAgICAgICAgIDxTd2l0Y2g+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Um91dGUgZXhhY3QgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0hvbWV9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9yZWdpc3RlclwiIGNvbXBvbmVudD17UmVnaXN0ZXJ9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9sb2dpblwiIGNvbXBvbmVudD17TG9nSW59IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9sb2dvdXRcIiBjb21wb25lbnQ9e0xvZ091dH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9Td2l0Y2g+ICAgIFxuICAgICAgICAgICAgICAgIDwvSGFzaFJvdXRlcj5cbiAgICAgICAgICAgIDwvUHJvdmlkZXI+XG4gICAgICAgIClcbiAgICB9XG59XG5cblJlYWN0RE9NLnJlbmRlcihcbiAgICA8QXBwLz4sXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jvb3QnKVxuKSJdLCJzb3VyY2VSb290IjoiIn0=