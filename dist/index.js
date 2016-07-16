(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetPrototype = Object.getPrototypeOf;

/**
 * Gets the `[[Prototype]]` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {null|Object} Returns the `[[Prototype]]`.
 */
function getPrototype(value) {
  return nativeGetPrototype(Object(value));
}

module.exports = getPrototype;

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
var getPrototype = require('./_getPrototype'),
    isHostObject = require('./_isHostObject'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
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
 * @returns {boolean} Returns `true` if `value` is a plain object,
 *  else `false`.
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

},{"./_getPrototype":1,"./_isHostObject":2,"./isObjectLike":3}],5:[function(require,module,exports){
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
},{"./compose":8}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{"./createStore":9,"./utils/warning":11,"lodash/isPlainObject":4}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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
},{"lodash/isPlainObject":4,"symbol-observable":13}],10:[function(require,module,exports){
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
},{"./applyMiddleware":5,"./bindActionCreators":6,"./combineReducers":7,"./compose":8,"./createStore":9,"./utils/warning":11}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){function h(a){c.appendChild(a.dom);return a}function k(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();k(++l%c.children.length)},!1);var g=(performance||Date).now(),e=g,a=0,r=h(new Stats.Panel("FPS","#0ff","#002")),f=h(new Stats.Panel("MS","#0f0","#020"));
if(self.performance&&self.performance.memory)var t=h(new Stats.Panel("MB","#f08","#201"));k(0);return{REVISION:16,dom:c,addPanel:h,showPanel:k,begin:function(){g=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();f.update(c-g,200);if(c>e+1E3&&(r.update(1E3*a/(c-e),100),e=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){g=this.end()},domElement:c,setMode:k}};
Stats.Panel=function(h,k,l){var c=Infinity,g=0,e=Math.round,a=e(window.devicePixelRatio||1),r=80*a,f=48*a,t=3*a,u=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=f;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,f);b.fillStyle=k;b.fillText(h,t,u);b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(f,
v){c=Math.min(c,f);g=Math.max(g,f);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=k;b.fillText(e(f)+" "+h+" ("+e(c)+"-"+e(g)+")",t,u);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,e((1-f/v)*p))}}};"object"===typeof module&&(module.exports=Stats);

},{}],13:[function(require,module,exports){
(function (global){
/* global window */
'use strict';

module.exports = require('./ponyfill')(global || window || this);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ponyfill":14}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setActiveBlock = setActiveBlock;
exports.moveActiveBlock = moveActiveBlock;
exports.rotateActiveBlock = rotateActiveBlock;

var _actionTypes = require('../constants/actionTypes');

var action = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Returns the location and shape of a new active block.
 * @param {Object} config
 * @param {String} config.identifier - The ID of the shape, e.g. "L"
 * @param {Array} config.shape - Shape example can be found in constants/shape.js
 * @returns {Object}
 * @todo Rethink if `column` and `row` should be handled differently.
 * @example setActiveBlock(new Tetromino())
 * // {
 * //		type: 'ACTIVE_BLOCK_SET',
 * //		identifier: 'L',
 * //		shape: [...]
 * //		column: 5,
 * //		row: 0
 * // }
 */
function setActiveBlock(_ref) {
  var identifier = _ref.identifier;
  var shape = _ref.shape;
  var column = _ref.column;

  return {
    type: action.ACTIVE_BLOCK_SET,
    identifier: identifier,
    shape: shape,
    column: column,
    row: 0
  };
}

/**
 * Returns an object with a direction keyword.
 * @param {String} direction - The direction, e.g. `'LEFT'` or `'RIGHT'`
 * @return {Object}
 * @example moveActiveBlock('DOWN')
 * // {
 * //		type: 'ACTIVE_BLOCK_MOVE',
 * //		direction: 'DOWN'
 * // }
 */
function moveActiveBlock(direction) {
  return {
    type: action.ACTIVE_BLOCK_MOVE,
    direction: direction
  };
}

/**
 * Returns a simple action object.
 * @return {Object}
 * @example rotateActiveBlock()
 * // {
 * //		type: 'ACTIVE_BLOCK_ROTATE'
 * // }
 */
function rotateActiveBlock() {
  return {
    type: action.ACTIVE_BLOCK_ROTATE
  };
}

},{"../constants/actionTypes":22}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.freezeBoard = freezeBoard;
exports.removeLineFromBoard = removeLineFromBoard;

var _actionTypes = require('../constants/actionTypes');

var action = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function freezeBoard(shape) {
	return {
		type: action.BOARD_FREEZE,
		shape: shape
	};
}

function removeLineFromBoard() {
	return {
		type: action.BOARD_LINE_REMOVE
	};
}

},{"../constants/actionTypes":22}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.startGame = startGame;
exports.endGame = endGame;

var _actionTypes = require('../constants/actionTypes');

var action = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function startGame() {
	return {
		type: action.GAME_START,
		isRunning: true
	};
}

function endGame() {
	return {
		type: action.GAME_END,
		isRunning: false
	};
}

},{"../constants/actionTypes":22}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stats = require('stats.js');

var _stats2 = _interopRequireDefault(_stats);

var _dom = require('../utils/dom');

var _board = require('../utils/board');

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _selectors = require('../selectors');

var _ = _interopRequireWildcard(_selectors);

var _activeBlock = require('../actions/activeBlock');

var _board2 = require('../actions/board');

var _tetromino = require('../components/tetromino');

var _tetromino2 = _interopRequireDefault(_tetromino);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

		if ("development" === 'development') {
			this.stats = new _stats2.default();
		}
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

			if ("development" === 'development') {
				this.stats.begin();
			}

			this.clearBoard();
			this.setBlockStyle({ fill: 'white' });
			this.drawBackground();
			this.drawActiveBlock();

			if ("development" === 'development') {
				this.stats.end();
			}
		}
	}, {
		key: 'cancelLoop',
		value: function cancelLoop() {
			cancelAnimationFrame(this.animationFrame);
		}
	}, {
		key: 'init',
		value: function init() {
			if ("development" === 'development') {
				this.appendStats();
			}

			this.setSize();
			this.drawBackground();

			_store2.default.subscribe(this.toggleGameState.bind(this));
		}
	}]);

	return Canvas;
}();

exports.default = Canvas;

},{"../actions/activeBlock":15,"../actions/board":16,"../components/tetromino":21,"../selectors":32,"../store":33,"../utils/board":34,"../utils/dom":35,"stats.js":12}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('../utils/dom');

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _tetromino = require('../components/tetromino');

var _tetromino2 = _interopRequireDefault(_tetromino);

var _game = require('../actions/game');

var _activeBlock = require('../actions/activeBlock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controls = function () {
	function Controls(controls) {
		_classCallCheck(this, Controls);

		this.controls = (0, _dom.$)(controls);
	}

	_createClass(Controls, [{
		key: 'addEvents',
		value: function addEvents() {
			this.controls.addEventListener('click', this.onClickControls);
		}
	}, {
		key: 'onClickControls',
		value: function onClickControls(_ref) {
			var target = _ref.target;

			if (target.nodeName === 'BUTTON') {
				var attr = target.getAttribute('data-control');
				target.blur();

				switch (attr) {
					case 'start':
						_store2.default.dispatch((0, _game.startGame)());
						_store2.default.dispatch((0, _activeBlock.setActiveBlock)(new _tetromino2.default()));
						return;
					case 'end':
						return _store2.default.dispatch((0, _game.endGame)());
					case 'left':
					case 'right':
						return _store2.default.dispatch((0, _activeBlock.moveActiveBlock)(attr.toUpperCase()));
					default:
						return;
				}
			}
		}
	}]);

	return Controls;
}();

exports.default = Controls;

},{"../actions/activeBlock":15,"../actions/game":17,"../components/tetromino":21,"../store":33,"../utils/dom":35}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _keyCode = require('../constants/keyCode');

var key = _interopRequireWildcard(_keyCode);

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _selectors = require('../selectors');

var _activeBlock = require('../actions/activeBlock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = function () {
	function Keyboard() {
		_classCallCheck(this, Keyboard);
	}

	_createClass(Keyboard, null, [{
		key: 'addEvents',
		value: function addEvents() {
			window.addEventListener('keydown', this.onPressKeydown);
		}
	}, {
		key: 'onPressKeydown',
		value: function onPressKeydown(_ref) {
			var keyCode = _ref.keyCode;

			if ((0, _selectors.isRunning)()) {
				switch (keyCode) {
					case key.LEFT_ARROW:
						return _store2.default.dispatch((0, _activeBlock.moveActiveBlock)('LEFT'));
					case key.RIGHT_ARROW:
						return _store2.default.dispatch((0, _activeBlock.moveActiveBlock)('RIGHT'));
					case key.SPACE_BAR:
					case key.UP_ARROW:
						return _store2.default.dispatch((0, _activeBlock.rotateActiveBlock)());
					default:
						return;
				}
			}
		}
	}]);

	return Keyboard;
}();

exports.default = Keyboard;

},{"../actions/activeBlock":15,"../constants/keyCode":24,"../selectors":32,"../store":33}],21:[function(require,module,exports){
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

},{"../constants/shapes":25}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Game
var GAME_START = exports.GAME_START = 'GAME_START';
var GAME_END = exports.GAME_END = 'GAME_END';

// Board
var BOARD_FREEZE = exports.BOARD_FREEZE = 'BOARD_FREEZE';
var BOARD_LINE_REMOVE = exports.BOARD_LINE_REMOVE = 'BOARD_LINE_REMOVE';

// Active Block
var ACTIVE_BLOCK_SET = exports.ACTIVE_BLOCK_SET = 'ACTIVE_BLOCK_SET';
var ACTIVE_BLOCK_MOVE = exports.ACTIVE_BLOCK_MOVE = 'ACTIVE_BLOCK_MOVE';
var ACTIVE_BLOCK_ROTATE = exports.ACTIVE_BLOCK_ROTATE = 'ACTIVE_BLOCK_ROTATE';

// Score
var SCORE_ADD = exports.SCORE_ADD = 'SCORE_ADD';

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BOARD_COLUMNS = exports.BOARD_COLUMNS = 10;
var BOARD_ROWS = exports.BOARD_ROWS = 20;

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SPACE_BAR = exports.SPACE_BAR = 32;
var UP_ARROW = exports.UP_ARROW = 38;
var LEFT_ARROW = exports.LEFT_ARROW = 37;
var RIGHT_ARROW = exports.RIGHT_ARROW = 39;
var DOWN_ARROW = exports.DOWN_ARROW = 40;

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
'use strict';

var _controls = require('./components/controls');

var _controls2 = _interopRequireDefault(_controls);

var _keyboard = require('./components/keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

var _canvas = require('./components/canvas');

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _canvas2.default('#game');
var controls = new _controls2.default('.tetrys-controls');

game.init();
controls.addEvents();
_keyboard2.default.addEvents();

},{"./components/canvas":18,"./components/controls":19,"./components/keyboard":20}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ActiveBlock;

var _actionTypes = require('../constants/actionTypes');

var type = _interopRequireWildcard(_actionTypes);

var _board = require('../utils/board');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
		case type.ACTIVE_BLOCK_SET:
			return Object.assign({}, state, {
				identifier: action.identifier,
				shape: action.shape,
				column: action.column,
				row: action.row
			});
		case type.ACTIVE_BLOCK_MOVE:
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
		case type.ACTIVE_BLOCK_ROTATE:
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

},{"../constants/actionTypes":22,"../utils/board":34}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Board;

var _actionTypes = require('../constants/actionTypes');

var type = _interopRequireWildcard(_actionTypes);

var _board = require('../constants/board');

var _board2 = require('../utils/board');

var _selectors = require('../selectors');

var _ = _interopRequireWildcard(_selectors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
	columns: _board.BOARD_COLUMNS,
	rows: _board.BOARD_ROWS,
	grid: (0, _board2.getEmptyGrid)()
};

function freeze(_ref) {
	var shape = _ref.shape;
	var grid = _ref.grid;

	var block = _.getActiveBlock();
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
		case type.BOARD_FREEZE:
			return Object.assign({}, state, {
				grid: freeze({ shape: action.shape, grid: state.grid })
			});
		case type.BOARD_LINE_REMOVE:
			return Object.assign({}, state, {
				grid: removeLine(state.grid)
			});
		default:
			return state;
	}
}

},{"../constants/actionTypes":22,"../constants/board":23,"../selectors":32,"../utils/board":34}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Game;

var _actionTypes = require('../constants/actionTypes');

var type = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
	isRunning: false
};

function Game() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case type.GAME_START:
		case type.GAME_END:
			return Object.assign({}, state, { isRunning: action.isRunning });
		default:
			return state;
	}
}

},{"../constants/actionTypes":22}],30:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tetrys = (0, _redux.combineReducers)({
	score: _score2.default,
	game: _game2.default,
	board: _board2.default,
	activeBlock: _activeBlock2.default
});

exports.default = tetrys;

},{"./activeBlock":27,"./board":28,"./game":29,"./score":31,"redux":10}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Score;

var _actionTypes = require('../constants/actionTypes');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
	highscore: {},
	all: []
};

function Score() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case _actionTypes.SCORE_ADD:
			return Object.assign({}, state, {
				all: [].concat(_toConsumableArray(state.all), [action.score])
			});
		default:
			return state;
	}
}

},{"../constants/actionTypes":22}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isRunning = isRunning;
exports.getBoardColumns = getBoardColumns;
exports.getBoardRows = getBoardRows;
exports.getGrid = getGrid;
exports.getActiveBlock = getActiveBlock;

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

},{"../store":33}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducers2.default, window.devToolsExtension && window.devToolsExtension());

exports.default = store;

},{"../reducers":30,"redux":10}],34:[function(require,module,exports){
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

},{"../constants/board":23,"../selectors":32}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var $ = exports.$ = document.querySelector.bind(document);
var $$ = exports.$$ = document.querySelectorAll.bind(document);

},{}]},{},[26]);
