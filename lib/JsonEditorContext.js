"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.JsonEditorProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _resolvers = require("./resolvers");

var defaultEditors = _interopRequireWildcard(require("./editors"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var JsonEditorContext = /*#__PURE__*/_react["default"].createContext({
  options: {
    resolvers: [],
    editors: {}
  }
});

var JsonEditorProvider = function JsonEditorProvider(_ref) {
  var children = _ref.children,
      options = _ref.options;

  var editorContext = _react["default"].useContext(JsonEditorContext);

  var resolvers = _resolvers.resolvers;

  if (options && options.resolvers) {
    if (!Array.isArray(options.resolvers)) {
      console.warn('options.resolvers 参数应为数组');
    } else {
      resolvers = resolvers.concat(options.resolvers);
    }
  }

  (0, _react.useEffect)(function () {
    console.log('___json.context.ready');
  }, []);
  return /*#__PURE__*/_react["default"].createElement(JsonEditorContext.Provider, {
    value: _extends(_extends({}, editorContext), {
      options: _extends(_extends({}, options), {
        resolvers: resolvers,
        editors: defaultEditors
      })
    })
  }, children);
};

exports.JsonEditorProvider = JsonEditorProvider;
var _default = JsonEditorContext;
exports["default"] = _default;