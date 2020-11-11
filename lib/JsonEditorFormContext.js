"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.JsonEditorFormProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _valueUtil = require("./utils/valueUtil");

var _NameMap = _interopRequireDefault(require("./utils/NameMap"));

var _Event = _interopRequireDefault(require("./utils/Event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var event = new _Event["default"]();

function getRoot(root) {
  if (root === undefined || root === null || root === '') return [];
  if (Array.isArray(root)) return root;
  return [root];
}

var JsonEditorFormContext = /*#__PURE__*/_react["default"].createContext({
  hiddenMap: {}
});

var JsonEditorFormProvider = function JsonEditorFormProvider(_ref) {
  var _ref$root = _ref.root,
      root = _ref$root === void 0 ? [] : _ref$root,
      children = _ref.children,
      form = _ref.form;

  var editorContext = _react["default"].useContext(JsonEditorFormContext);

  var dependencySet = (0, _react.useRef)(new _NameMap["default"]());
  var valueSet = (0, _react.useRef)(new _NameMap["default"]());
  var fieldKeySet = (0, _react.useRef)([]);

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      hiddenState = _useState2[0],
      setHiddenState = _useState2[1];

  var rootpath = getRoot(root);

  function notify(path, value) {
    event.publish(path, value);
  }

  function isVisible(path) {
    var v = valueSet.current.get(path);
    if (!v) return false;
    var dependencies = v.map(function (m) {
      return m.value;
    });
    if (dependencies.length === 0) return false;
    var res = dependencies.some(function (m) {
      if (Array.isArray(m.expect)) return m.expect.includes(m.value);
      return m.expect === m.value;
    });
    return !res;
  }

  var registerDependencies = (0, _react.useCallback)(function (path, dependencies, root) {
    var initialValue = new _NameMap["default"]();
    var key = path.join('.');
    Object.entries(dependencies || {}).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          dependency = _ref3[0],
          v = _ref3[1];

      var dependencypath = root.concat(dependency.split('.'));
      if (!fieldKeySet.current.some(function (m) {
        return (0, _valueUtil.matchNamePath)(m, dependencypath);
      })) return;
      var value = form.getFieldValue(dependencypath);
      initialValue.set(dependencypath, {
        expect: v,
        value: value
      });
      event.subscribe(dependencypath, function (value) {
        valueSet.current.update(path, function (origin) {
          origin.update(dependencypath, function (m) {
            return _extends(_extends({}, m), {
              value: value
            });
          });
          return origin;
        });
        setHiddenState(function (prevState) {
          if (prevState[key] === isVisible(path)) return prevState;
          return _extends(_extends({}, prevState), _defineProperty({}, key, isVisible(path)));
        });
      });
    });
    valueSet.current.set(path, initialValue);
  }, [form]);
  var registerField = (0, _react.useCallback)(function (path, schema) {
    var _a;

    fieldKeySet.current.push(path);

    if ((_a = schema === null || schema === void 0 ? void 0 : schema.options) === null || _a === void 0 ? void 0 : _a.dependencies) {
      dependencySet.current.set(path, schema.options.dependencies);
    }

    return function (path) {
      fieldKeySet.current = fieldKeySet.current.filter(function (m) {
        return !(0, _valueUtil.matchNamePath)(m, path);
      });
      setHiddenState(function (prevState) {
        var res = Object.entries(prevState).filter(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 1),
              k = _ref5[0];

          return path.join('.') !== k;
        }).reduce(function (prev, _ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
              k = _ref7[0],
              v = _ref7[1];

          return _extends(_extends({}, prev), _defineProperty({}, k, v));
        }, {});
        return res;
      });
    };
  }, [hiddenState]);
  (0, _react.useEffect)(function () {
    dependencySet.current.forEach(function (m) {
      return registerDependencies(m.key, m.value, rootpath);
    });
    var initialHiddenMap = {};
    dependencySet.current.forEach(function (m) {
      initialHiddenMap = _extends(_extends({}, initialHiddenMap), _defineProperty({}, m.key.join('.'), isVisible(m.key)));
    });
    setHiddenState(function (prevState) {
      return _extends(_extends({}, prevState), initialHiddenMap);
    });
  }, [rootpath]);
  (0, _react.useEffect)(function () {
    console.log('___json.context.ready', valueSet.current);
  }, []);
  return /*#__PURE__*/_react["default"].createElement(JsonEditorFormContext.Provider, {
    value: _extends(_extends({}, editorContext), {
      root: rootpath,
      notify: notify,
      registerField: registerField,
      hiddenMap: hiddenState
    })
  }, children);
};

exports.JsonEditorFormProvider = JsonEditorFormProvider;
var _default = JsonEditorFormContext;
exports["default"] = _default;