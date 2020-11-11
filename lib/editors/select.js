"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/select/style");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireDefault(require("react"));

var _LabelField = _interopRequireDefault(require("../components/LabelField"));

var _JsonEditorFormContext = _interopRequireDefault(require("../JsonEditorFormContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Option = _select["default"].Option;

var SelectEditor = function SelectEditor(_ref) {
  var schema = _ref.schema,
      path = _ref.path,
      title = _ref.title;

  var _React$useContext = _react["default"].useContext(_JsonEditorFormContext["default"]),
      root = _React$useContext.root;

  var options = [];
  var fieldpath = path || root || [];
  var enum_display = [];

  if (schema["enum"]) {
    var display = schema.options && schema.options.enum_titles || [];
    options = schema["enum"].map(function (option, i) {
      return {
        value: "".concat(option),
        label: "".concat(display[i] || option)
      };
    });
  } else {
    enum_display = schema.options && schema.options.enum_titles || ['是', '否'];
    options = [{
      label: enum_display[0],
      value: 1
    }, {
      label: enum_display[1],
      value: 0
    }];
  }

  return /*#__PURE__*/_react["default"].createElement(_LabelField["default"], {
    name: fieldpath,
    label: title,
    schema: schema
  }, function (control) {
    return /*#__PURE__*/_react["default"].createElement(_select["default"], _extends({}, control), options.map(function (option) {
      return /*#__PURE__*/_react["default"].createElement(Option, {
        key: "".concat(option.value),
        value: option.value
      }, option.label);
    }));
  });
};

var _default = SelectEditor;
exports["default"] = _default;