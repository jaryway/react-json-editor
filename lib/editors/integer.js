"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

var _react = _interopRequireDefault(require("react"));

var _LabelField = _interopRequireDefault(require("../components/LabelField"));

var _JsonEditorFormContext = _interopRequireDefault(require("../JsonEditorFormContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var IntegerEditor = function IntegerEditor(_ref) {
  var schema = _ref.schema,
      path = _ref.path,
      title = _ref.title;
  var min = schema.min,
      max = schema.max,
      step = schema.step;

  var _React$useContext = _react["default"].useContext(_JsonEditorFormContext["default"]),
      root = _React$useContext.root;

  var fieldpath = path || root || [];
  return /*#__PURE__*/_react["default"].createElement(_LabelField["default"], {
    name: fieldpath,
    label: title,
    schema: schema
  }, function (control) {
    return /*#__PURE__*/_react["default"].createElement(_inputNumber["default"], _extends({}, control, {
      step: step,
      min: min,
      max: max
    }));
  });
};

var _default = IntegerEditor;
exports["default"] = _default;