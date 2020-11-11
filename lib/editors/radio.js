"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/radio/style");

var _radio = _interopRequireDefault(require("antd/lib/radio"));

var _react = _interopRequireDefault(require("react"));

var _LabelField = _interopRequireDefault(require("../components/LabelField"));

var _JsonEditorFormContext = _interopRequireDefault(require("../JsonEditorFormContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var RadioEditor = function RadioEditor(_ref) {
  var path = _ref.path,
      title = _ref.title,
      schema = _ref.schema;

  var _React$useContext = _react["default"].useContext(_JsonEditorFormContext["default"]),
      root = _React$useContext.root;

  var e = schema["enum"] || [];

  var _ref2 = schema.options || {},
      mode = _ref2.mode,
      enum_titles = _ref2.enum_titles;

  var titles = enum_titles || [];
  var fieldpath = path || root || [];
  var options = e.map(function (m, i) {
    return {
      value: m,
      label: titles[i] || m
    };
  });
  return /*#__PURE__*/_react["default"].createElement(_LabelField["default"], {
    name: fieldpath,
    label: title,
    schema: schema
  }, function (control) {
    if (mode === 'button') return /*#__PURE__*/_react["default"].createElement(_radio["default"].Group, _extends({}, control), options.map(function (m) {
      return /*#__PURE__*/_react["default"].createElement(_radio["default"].Button, {
        key: m.value,
        value: m.value
      }, m.label);
    }));
    return /*#__PURE__*/_react["default"].createElement(_radio["default"].Group, _extends({}, control, {
      options: options
    }));
  });
};

var _default = RadioEditor;
exports["default"] = _default;