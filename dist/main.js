(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
var overArg = require('./_overArg');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

},{"./_overArg":4}],3:[function(require,module,exports){
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

module.exports = isHostObject;

},{}],4:[function(require,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],5:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":1}],6:[function(require,module,exports){
var isObject = require('./isObject'),
    now = require('./now'),
    toNumber = require('./toNumber');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

},{"./isObject":7,"./now":11,"./toNumber":13}],7:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],8:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],9:[function(require,module,exports){
var getPrototype = require('./_getPrototype'),
    isHostObject = require('./_isHostObject'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isPlainObject;

},{"./_getPrototype":2,"./_isHostObject":3,"./isObjectLike":8}],10:[function(require,module,exports){
var isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

module.exports = isSymbol;

},{"./isObjectLike":8}],11:[function(require,module,exports){
var root = require('./_root');

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;

},{"./_root":5}],12:[function(require,module,exports){
var debounce = require('./debounce'),
    isObject = require('./isObject');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;

},{"./debounce":6,"./isObject":7}],13:[function(require,module,exports){
var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isObject":7,"./isSymbol":10}],14:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = applyMiddleware;

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, initialState, enhancer) {
      var store = createStore(reducer, initialState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
},{"./compose":17}],15:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports["default"] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
},{}],16:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports["default"] = combineReducers;

var _createStore = require('./createStore');

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = require('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2["default"])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key);
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerSanity(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var sanityError;
  try {
    assertReducerSanity(finalReducers);
  } catch (e) {
    sanityError = e;
  }

  return function combination() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    if (sanityError) {
      throw sanityError;
    }

    if ("development" !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
      if (warningMessage) {
        (0, _warning2["default"])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i];
      var reducer = finalReducers[key];
      var previousStateForKey = state[key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
},{"./createStore":18,"./utils/warning":20,"lodash/isPlainObject":9}],17:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  } else {
    var _ret = function () {
      var last = funcs[funcs.length - 1];
      var rest = funcs.slice(0, -1);
      return {
        v: function v() {
          return rest.reduceRight(function (composed, f) {
            return f(composed);
          }, last.apply(undefined, arguments));
        }
      };
    }();

    if (typeof _ret === "object") return _ret.v;
  }
}
},{}],18:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.ActionTypes = undefined;
exports["default"] = createStore;

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = require('symbol-observable');

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = exports.ActionTypes = {
  INIT: '@@redux/INIT'
};

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [initialState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
function createStore(reducer, initialState, enhancer) {
  var _ref2;

  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
    enhancer = initialState;
    initialState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, initialState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = initialState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!(0, _isPlainObject2["default"])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/zenparsing/es-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */

      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[_symbolObservable2["default"]] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable2["default"]] = observable, _ref2;
}
},{"lodash/isPlainObject":9,"symbol-observable":21}],19:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

var _createStore = require('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _combineReducers = require('./combineReducers');

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _bindActionCreators = require('./bindActionCreators');

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _applyMiddleware = require('./applyMiddleware');

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _warning = require('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  (0, _warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = _createStore2["default"];
exports.combineReducers = _combineReducers2["default"];
exports.bindActionCreators = _bindActionCreators2["default"];
exports.applyMiddleware = _applyMiddleware2["default"];
exports.compose = _compose2["default"];
},{"./applyMiddleware":14,"./bindActionCreators":15,"./combineReducers":16,"./compose":17,"./createStore":18,"./utils/warning":20}],20:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports["default"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}
},{}],21:[function(require,module,exports){
(function (global){
/* global window */
'use strict';

module.exports = require('./ponyfill')(global || window || this);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ponyfill":22}],22:[function(require,module,exports){
'use strict';

module.exports = function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setActiveBlock = setActiveBlock;
exports.moveActiveBlock = moveActiveBlock;
exports.rotateActiveBlock = rotateActiveBlock;

var _activeBlock = require('../constants/activeBlock');

function setActiveBlock(_ref) {
	var identifier = _ref.identifier;
	var shape = _ref.shape;
	var column = _ref.column;

	return {
		type: _activeBlock.ACTIVE_BLOCK_SET,
		identifier: identifier,
		shape: shape,
		column: column,
		row: 0
	};
}

function moveActiveBlock(direction) {
	return {
		type: _activeBlock.ACTIVE_BLOCK_MOVE,
		direction: direction
	};
}

function rotateActiveBlock() {
	return {
		type: _activeBlock.ACTIVE_BLOCK_ROTATE
	};
}

},{"../constants/activeBlock":32}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.freezeBoard = freezeBoard;
exports.removeLineFromBoard = removeLineFromBoard;

var _board = require('../constants/board');

function freezeBoard(shape) {
	return {
		type: _board.BOARD_FREEZE,
		shape: shape
	};
}

function removeLineFromBoard() {
	return {
		type: _board.BOARD_LINE_REMOVE
	};
}

},{"../constants/board":33}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = changeRoute;

var _route = require('../constants/route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function changeRoute(route) {
	return {
		type: _route2.default,
		route: route
	};
}

},{"../constants/route":36}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.updateCurrentScore = updateCurrentScore;
exports.setHighscore = setHighscore;
exports.addScore = addScore;

var _score = require('../constants/score');

function updateCurrentScore(current) {
	return {
		type: _score.SCORE_CURRENT_UPDATE,
		current: current
	};
}

function setHighscore(highscore) {
	return {
		type: _score.SCORE_HIGHSCORE_SET,
		highscore: highscore
	};
}

function addScore(score) {
	return {
		type: _score.SCORE_ADD,
		score: score
	};
}

},{"../constants/score":37}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dom = require('../utils/dom');

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _route = require('../actions/route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var $buttons = [].concat(_toConsumableArray((0, _dom.$$)('button')));

function onClickButton(_ref) {
	var target = _ref.target;

	if (target.nodeName !== 'BUTTON') return;
	var dataRoute = target.getAttribute('data-route');

	if (dataRoute) {
		_store2.default.dispatch((0, _route2.default)(dataRoute));
	}

	target.blur();
}

function addEvents() {
	$buttons.forEach(function ($btn) {
		return $btn.addEventListener('click', onClickButton);
	});
}

exports.default = { addEvents: addEvents };

},{"../actions/route":25,"../store":48,"../utils/dom":50}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import Stats from 'stats.js'


var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _dom = require('../utils/dom');

var _board = require('../utils/board');

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _selectors = require('../selectors');

var _ = _interopRequireWildcard(_selectors);

var _activeBlock = require('../actions/activeBlock');

var _board2 = require('../actions/board');

var _score = require('../actions/score');

var _tetromino = require('../components/tetromino');

var _tetromino2 = _interopRequireDefault(_tetromino);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const { NODE_ENV } = process.env

var Canvas = function () {
	function Canvas(canvas) {
		_classCallCheck(this, Canvas);

		this.canvas = (0, _dom.$)(canvas);
		this.context = this.canvas.getContext('2d');
		this.wrapper = this.canvas.parentNode;
		this.width = this.wrapper.offsetWidth;
		this.height = this.wrapper.offsetHeight;
		this.blockWidth = this.width / _.getBoardColumns();
		this.blockHeight = this.height / _.getBoardRows();
		this.animationFrame = null;
		this.activeBlockPositionAnimation = null;
		this.isRunningInternal = false;
		this.initialSpeed = 500;

		// if (NODE_ENV === 'development') {
		// 	this.stats = new Stats()
		// }
	}

	_createClass(Canvas, [{
		key: 'appendStats',
		value: function appendStats() {
			this.stats.showPanel(0);
			document.body.appendChild(this.stats.dom);
		}
	}, {
		key: 'setSize',
		value: function setSize() {
			this.canvas.width = this.width = this.wrapper.offsetWidth;
			this.canvas.height = this.height = this.wrapper.offsetHeight;
			this.blockWidth = this.width / _.getBoardColumns();
			this.blockHeight = this.height / _.getBoardRows();
		}
	}, {
		key: 'toggleGameState',
		value: function toggleGameState() {
			if (_.isRunning() && !this.isRunningInternal) {
				this.isRunningInternal = true;
				this.updateActiveBlockPosition();
				this.loop();
			} else if (!_.isRunning() && this.isRunningInternal) {
				this.isRunningInternal = false;
				this.cancelActiveBlockPosition();
				this.cancelLoop();
			}
		}
	}, {
		key: 'clearBoard',
		value: function clearBoard() {
			this.context.clearRect(0, 0, this.width, this.height);
		}
	}, {
		key: 'setBlockStyle',
		value: function setBlockStyle() {
			var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			var fill = _ref.fill;
			var _ref$stroke = _ref.stroke;
			var stroke = _ref$stroke === undefined ? 'transparent' : _ref$stroke;

			this.context.fillStyle = fill;
			this.context.strokeStyle = stroke;
		}
	}, {
		key: 'drawSimpleBlock',
		value: function drawSimpleBlock(x, y) {
			this.context.fillRect(this.blockWidth * x, this.blockHeight * y, this.blockWidth - 1, this.blockHeight - 1);
			this.context.strokeRect(this.blockWidth * x, this.blockHeight * y, this.blockWidth - 1, this.blockHeight - 1);
		}
	}, {
		key: 'drawBackground',
		value: function drawBackground() {
			for (var y = 0, grid = _.getGrid(); y < grid.length; ++y) {
				for (var x = 0; x < grid[y].length; ++x) {
					if (grid[y][x] === 1) {
						this.setBlockStyle({ fill: 'mediumseagreen' });
					} else {
						this.setBlockStyle({ fill: 'white' });
					}
					this.drawSimpleBlock(x, y);
				}
			}
		}
	}, {
		key: 'drawActiveBlock',
		value: function drawActiveBlock() {
			var block = _.getActiveBlock();
			for (var y = 0; y < block.shape.length; ++y) {
				for (var x = 0; x < block.shape.length; ++x) {
					if (block.shape[y][x]) {
						this.setBlockStyle({ fill: 'cornflowerblue' });
						this.drawSimpleBlock(block.column + x, block.row + y);
					}
				}
			}
		}
	}, {
		key: 'updateActiveBlockPosition',
		value: function updateActiveBlockPosition() {
			this.activeBlockPositionAnimation = setInterval(function () {
				if ((0, _board.validBoardBoundary)({ offsetY: 1 })) {
					_store2.default.dispatch((0, _activeBlock.moveActiveBlock)('DOWN'));
					_store2.default.dispatch((0, _score.updateCurrentScore)(10));
				} else {
					_store2.default.dispatch((0, _board2.freezeBoard)(_.getActiveBlock().shape));
					_store2.default.dispatch((0, _board2.removeLineFromBoard)());
					_store2.default.dispatch((0, _activeBlock.setActiveBlock)(new _tetromino2.default()));
				}
			}, this.initialSpeed);
		}
	}, {
		key: 'cancelActiveBlockPosition',
		value: function cancelActiveBlockPosition() {
			clearInterval(this.activeBlockPositionAnimation);
		}
	}, {
		key: 'loop',
		value: function loop() {
			this.animationFrame = requestAnimationFrame(this.loop.bind(this));

			// if (process.env.NODE_ENV === 'development') {
			// 	this.stats.begin()
			// }

			this.clearBoard();
			this.setBlockStyle({ fill: 'white' });
			this.drawBackground();
			this.drawActiveBlock();

			// if (process.env.NODE_ENV === 'development') {
			// 	this.stats.end()
			// }
		}
	}, {
		key: 'cancelLoop',
		value: function cancelLoop() {
			cancelAnimationFrame(this.animationFrame);
		}
	}, {
		key: 'addEvents',
		value: function addEvents() {
			window.addEventListener('resize', (0, _throttle2.default)(this.setSize, 100).bind(this));
		}
	}, {
		key: 'init',
		value: function init() {
			// if (NODE_ENV === 'development') {
			// 	this.appendStats()
			// }

			this.addEvents();
			this.setSize();
			this.drawBackground();

			_store2.default.subscribe(this.toggleGameState.bind(this));
		}
	}]);

	return Canvas;
}();

exports.default = Canvas;

},{"../actions/activeBlock":23,"../actions/board":24,"../actions/score":26,"../components/tetromino":30,"../selectors":47,"../store":48,"../utils/board":49,"../utils/dom":50,"lodash/throttle":12}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _selectors = require('../selectors');

var _activeBlock = require('../actions/activeBlock');

var _keyCode = require('../constants/keyCode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onPressKeydown(_ref) {
	var keyCode = _ref.keyCode;

	if (!(0, _selectors.isRunning)()) {
		return;
	}

	switch (keyCode) {
		case _keyCode.LEFT_ARROW:
			return _store2.default.dispatch((0, _activeBlock.moveActiveBlock)('LEFT'));
		case _keyCode.RIGHT_ARROW:
			return _store2.default.dispatch((0, _activeBlock.moveActiveBlock)('RIGHT'));
		case _keyCode.SPACE_BAR:
		case _keyCode.UP_ARROW:
			return _store2.default.dispatch((0, _activeBlock.rotateActiveBlock)());
		default:
			return;
	}
}

function addEvents() {
	window.addEventListener('keydown', onPressKeydown);
}

exports.default = { addEvents: addEvents };

},{"../actions/activeBlock":23,"../constants/keyCode":35,"../selectors":47,"../store":48}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _shapes = require('../constants/shapes');

var _shapes2 = _interopRequireDefault(_shapes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tetromino = function Tetromino() {
	_classCallCheck(this, Tetromino);

	this.randomID = Math.floor(Math.random() * Object.keys(_shapes2.default).length);
	this.identifier = Object.keys(_shapes2.default)[this.randomID];
	this.shape = _shapes2.default[this.identifier];
	this.column = 5;

	if (this.identifier === 'I' || this.identifier === 'O') {
		this.column = 4;
	}

	return {
		identifier: this.identifier,
		shape: this.shape,
		column: this.column,
		row: -1
	};
};

exports.default = Tetromino;

},{"../constants/shapes":38}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _selectors = require('../selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $body = document.body;

function updateBodyClass() {
	$body.className = $body.className.replace(/page-(.*)/g, 'page-' + (0, _selectors.getRoute)());
}

function addEvents() {
	_store2.default.subscribe(updateBodyClass);
}

exports.default = { addEvents: addEvents };

},{"../selectors":47,"../store":48}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ACTIVE_BLOCK_SET = exports.ACTIVE_BLOCK_SET = 'ACTIVE_BLOCK_SET';
var ACTIVE_BLOCK_MOVE = exports.ACTIVE_BLOCK_MOVE = 'ACTIVE_BLOCK_MOVE';
var ACTIVE_BLOCK_ROTATE = exports.ACTIVE_BLOCK_ROTATE = 'ACTIVE_BLOCK_ROTATE';

},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BOARD_FREEZE = exports.BOARD_FREEZE = 'BOARD_FREEZE';
var BOARD_LINE_REMOVE = exports.BOARD_LINE_REMOVE = 'BOARD_LINE_REMOVE';
var BOARD_COLUMNS = exports.BOARD_COLUMNS = 10;
var BOARD_ROWS = exports.BOARD_ROWS = 20;

},{}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var GAME_START = exports.GAME_START = 'GAME_START';
var GAME_PAUSED = exports.GAME_PAUSED = 'GAME_PAUSED';
var GAME_END = exports.GAME_END = 'GAME_END';
var GAME_LEVEL_UPDATE = exports.GAME_LEVEL_UPDATE = 'GAME_LEVEL_UPDATE';

},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SPACE_BAR = exports.SPACE_BAR = 32;
var UP_ARROW = exports.UP_ARROW = 38;
var LEFT_ARROW = exports.LEFT_ARROW = 37;
var RIGHT_ARROW = exports.RIGHT_ARROW = 39;
var DOWN_ARROW = exports.DOWN_ARROW = 40;

},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ROUTE_CHANGE = 'ROUTE_CHANGE';
exports.default = ROUTE_CHANGE;

},{}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SCORE_CURRENT_UPDATE = exports.SCORE_CURRENT_UPDATE = 'SCORE_CURRENT_UPDATE';
var SCORE_HIGHSCORE_SET = exports.SCORE_HIGHSCORE_SET = 'SCORE_HIGHSCORE_SET';
var SCORE_ADD = exports.SCORE_ADD = 'SCORE_ADD';

},{}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var SHAPES = {
	I: [[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
	O: [[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
	T: [[1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]],
	L: [[1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0]],
	Z: [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]]
};

exports.default = SHAPES;

},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TETRYS_STATE = exports.TETRYS_STATE = 'TETRYS_STATE';
var TETRYS_CACHE = exports.TETRYS_CACHE = 'TETRYS_CACHE';

},{}],40:[function(require,module,exports){
'use strict';

var _keyboard = require('./components/keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

var _buttons = require('./components/buttons');

var _buttons2 = _interopRequireDefault(_buttons);

var _views = require('./components/views');

var _views2 = _interopRequireDefault(_views);

var _canvas = require('./components/canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _serviceWorker = require('./utils/serviceWorker');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _serviceWorker.installServiceWorker)();

// Initialise UI
var game = new _canvas2.default('#game');
_keyboard2.default.addEvents();
_buttons2.default.addEvents();
_views2.default.addEvents();
game.init();

},{"./components/buttons":27,"./components/canvas":28,"./components/keyboard":29,"./components/views":31,"./utils/serviceWorker":52}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ActiveBlock;

var _activeBlock = require('../constants/activeBlock');

var _board = require('../utils/board');

var initialState = {
	identifier: '',
	shape: [],
	column: 0,
	row: 0
};

function rotateBlock(current) {
	var newCurrent = [];
	for (var y = 0; y < current.length; ++y) {
		newCurrent[y] = [];
		for (var x = 0; x < current.length; ++x) {
			newCurrent[y][x] = current[current.length - 1 - x][y];
		}
	}
	return newCurrent;
}

function ActiveBlock() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case _activeBlock.ACTIVE_BLOCK_SET:
			return Object.assign({}, state, {
				identifier: action.identifier,
				shape: action.shape,
				column: action.column,
				row: action.row
			});
		case _activeBlock.ACTIVE_BLOCK_MOVE:
			{
				switch (action.direction) {
					case 'LEFT':
						if ((0, _board.validBoardBoundary)({ offsetX: -1 })) {
							return Object.assign({}, state, { column: --state.column });
						}
						return state;
					case 'RIGHT':
						if ((0, _board.validBoardBoundary)({ offsetX: 1 })) {
							return Object.assign({}, state, { column: ++state.column });
						}
						return state;
					case 'DOWN':
						if ((0, _board.validBoardBoundary)({ offsetY: 1 })) {
							return Object.assign({}, state, { row: ++state.row });
						}
						return state;
					default:
						return state;
				}
			}
		case _activeBlock.ACTIVE_BLOCK_ROTATE:
			{
				var tetromino = rotateBlock(state.shape);
				if ((0, _board.validBoardBoundary)({ tetromino: tetromino })) {
					return Object.assign({}, state, { shape: tetromino });
				}
				return state;
			}
		default:
			return state;
	}
}

},{"../constants/activeBlock":32,"../utils/board":49}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Board;

var _board = require('../constants/board');

var _board2 = require('../utils/board');

var _selectors = require('../selectors');

var initialState = {
	columns: _board.BOARD_COLUMNS,
	rows: _board.BOARD_ROWS,
	grid: (0, _board2.getEmptyGrid)()
};

function freeze(_ref) {
	var shape = _ref.shape;
	var grid = _ref.grid;

	var block = (0, _selectors.getActiveBlock)();
	var newGrid = grid;
	for (var y = 0; y < shape.length; ++y) {
		for (var x = 0; x < shape.length; ++x) {
			if (shape[y][x]) {
				newGrid[y + block.row][x + block.column] = shape[y][x];
			}
		}
	}
	return newGrid;
}

function removeLine(grid) {
	var newGrid = grid;
	for (var y = _board.BOARD_ROWS - 1; y >= 0; --y) {
		var filledRow = true;
		for (var x = 0; x < _board.BOARD_COLUMNS; ++x) {
			if (grid[y][x] === 0) {
				filledRow = false;
				break;
			}
		}
		if (filledRow) {
			for (var yy = y; yy > 0; --yy) {
				for (var _x = 0; _x < _board.BOARD_COLUMNS; ++_x) {
					newGrid[yy][_x] = grid[yy - 1][_x];
				}
			}
			++y;
		}
	}
	return newGrid;
}

function Board() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case _board.BOARD_FREEZE:
			return Object.assign({}, state, {
				grid: freeze({ shape: action.shape, grid: state.grid })
			});
		case _board.BOARD_LINE_REMOVE:
			return Object.assign({}, state, {
				grid: removeLine(state.grid)
			});
		default:
			return state;
	}
}

},{"../constants/board":33,"../selectors":47,"../utils/board":49}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Game;

var _game = require('../constants/game');

var initialState = {
	isRunning: false,
	level: 1
};

function Game() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case _game.GAME_START:
		case _game.GAME_PAUSED:
		case _game.GAME_END:
			return Object.assign({}, state, {
				isRunning: action.isRunning
			});
		case _game.GAME_LEVEL_UPDATE:
			return Object.assign({}, state, {
				level: ++state.level
			});
		default:
			return state;
	}
}

},{"../constants/game":34}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

var _activeBlock = require('./activeBlock');

var _activeBlock2 = _interopRequireDefault(_activeBlock);

var _score = require('./score');

var _score2 = _interopRequireDefault(_score);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
	score: _score2.default,
	game: _game2.default,
	board: _board2.default,
	activeBlock: _activeBlock2.default,
	route: _route2.default
});

},{"./activeBlock":41,"./board":42,"./game":43,"./route":45,"./score":46,"redux":19}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Route;

var _route = require('../constants/route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
	route: 'menu'
};

function Route() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case _route2.default:
			return Object.assign({}, state, {
				route: action.route
			});
		default:
			return state;
	}
}

},{"../constants/route":36}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Score;

var _score = require('../constants/score');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
	current: 0,
	highscore: 0,
	all: []
};

function Score() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case _score.SCORE_CURRENT_UPDATE:
			return Object.assign({}, state, {
				current: state.current + action.current
			});
		case _score.SCORE_HIGHSCORE_SET:
			return Object.assign({}, state, {
				highscore: action.highscore
			});
		case _score.SCORE_ADD:
			return Object.assign({}, state, {
				all: [].concat(_toConsumableArray(state.all), [action.all])
			});
		default:
			return state;
	}
}

},{"../constants/score":37}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isRunning = isRunning;
exports.getBoardColumns = getBoardColumns;
exports.getBoardRows = getBoardRows;
exports.getGrid = getGrid;
exports.getActiveBlock = getActiveBlock;
exports.getCurrentScore = getCurrentScore;
exports.getRoute = getRoute;

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Game
function isRunning() {
	return _store2.default.getState().game.isRunning;
}

// Board
function getBoardColumns() {
	return _store2.default.getState().board.columns;
}
function getBoardRows() {
	return _store2.default.getState().board.rows;
}
function getGrid() {
	return _store2.default.getState().board.grid;
}

// Active block
function getActiveBlock() {
	return _store2.default.getState().activeBlock;
}

// Score
function getCurrentScore() {
	return _store2.default.getState().score.current;
}

// Route
function getRoute() {
	return _store2.default.getState().route.route;
}

},{"../store":48}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _redux = require('redux');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _localStorage = require('../utils/localStorage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var persistedState = (0, _localStorage.loadState)();
var store = (0, _redux.createStore)(_reducers2.default, persistedState, window.devToolsExtension && window.devToolsExtension());

store.subscribe((0, _throttle2.default)(function () {
	(0, _localStorage.saveState)({
		score: store.getState().score
	});
}), 5000);

exports.default = store;

},{"../reducers":44,"../utils/localStorage":51,"lodash/throttle":12,"redux":19}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getEmptyGrid = getEmptyGrid;
exports.validBoardBoundary = validBoardBoundary;

var _board = require('../constants/board');

var _selectors = require('../selectors');

var _ = _interopRequireWildcard(_selectors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getEmptyGrid() {
	var grid = [];

	for (var i = 0; i < _board.BOARD_ROWS; i++) {
		grid[i] = [];
		for (var j = 0; j < _board.BOARD_COLUMNS; j++) {
			grid[i].push(0);
		}
	}

	return grid;
}

function validBoardBoundary() {
	var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	var _ref$offsetX = _ref.offsetX;
	var offsetX = _ref$offsetX === undefined ? 0 : _ref$offsetX;
	var _ref$offsetY = _ref.offsetY;
	var offsetY = _ref$offsetY === undefined ? 0 : _ref$offsetY;
	var _ref$tetromino = _ref.tetromino;
	var tetromino = _ref$tetromino === undefined ? [] : _ref$tetromino;

	var activeBlock = _.getActiveBlock();
	var newOffsetX = activeBlock.column + offsetX;
	var newOffsetY = activeBlock.row + offsetY;
	var shape = tetromino;

	if (shape.length === 0) {
		shape = activeBlock.shape;
	}

	for (var y = 0; y < shape.length; ++y) {
		for (var x = 0; x < shape.length; ++x) {
			if (shape[y][x]) {
				var grid = _.getGrid();
				if (typeof grid[y + newOffsetY] === 'undefined' || typeof grid[y + newOffsetY][x + newOffsetX] === 'undefined' || grid[y + newOffsetY][x + newOffsetX] || x + newOffsetX < 0 || y + newOffsetY >= _.getBoardRows() || x + newOffsetX >= _.getBoardColumns()) {
					// if (x + newOffsetX >= _.getBoardColumns() ||
					// y + newOffsetY >= _.getBoardRows()) {
					// 	console.group()
					// 	console.log('x =>', x)
					// 	console.log('newOffsetX =>', newOffsetX)
					// 	console.log('x + newOffsetX', x + newOffsetX)
					// 	console.log('_.getBoardColumns()', _.getBoardColumns())
					// 	console.log('y =>', y)
					// 	console.log('newOffsetY =>', newOffsetY)
					// 	console.log('y + newOffsetY', y + newOffsetY)
					// 	console.log('_.getBoardRows()', _.getBoardRows())
					// 	console.groupEnd()
					// }

					return false;
				}
			}
		}
	}

	return true;
}

},{"../constants/board":33,"../selectors":47}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var $ = exports.$ = document.querySelector.bind(document);
var $$ = exports.$$ = document.querySelectorAll.bind(document);

},{}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadState = loadState;
exports.saveState = saveState;

var _tetrys = require('../constants/tetrys');

function loadState() {
	try {
		var serialized = localStorage.getItem(_tetrys.TETRYS_STATE);
		if (serialized === null) {
			return undefined;
		}
		return JSON.parse(serialized);
	} catch (error) {
		return undefined;
	}
}

function saveState(state) {
	try {
		var serialized = JSON.stringify(state);
		localStorage.setItem(_tetrys.TETRYS_STATE, serialized);
	} catch (error) {
		console.error(error);
		console.error('Failed to save state', state);
	}
}

},{"../constants/tetrys":39}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.installServiceWorker = installServiceWorker;
function installServiceWorker() {
	if (!('serviceWorker' in navigator)) {
		return;
	}

	navigator.serviceWorker.register('/worker.js').then(function (registration) {
		console.log('ServiceWorker registration successful with scope: ', registration.scope);
	}).catch(function (error) {
		console.error('ServiceWorker registration failed: ', error);
	});
}

},{}]},{},[40]);
