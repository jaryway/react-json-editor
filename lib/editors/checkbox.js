"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/checkbox/style");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

var _react = _interopRequireDefault(require("react"));

var _LabelField = _interopRequireDefault(require("../components/LabelField"));

var _JsonEditorFormContext = _interopRequireDefault(require("../JsonEditorFormContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var CheckboxEditor = function CheckboxEditor(_ref) {
  var schema = _ref.schema,
      path = _ref.path,
      title = _ref.title;

  var _React$useContext = _react["default"].useContext(_JsonEditorFormContext["default"]),
      root = _React$useContext.root;

  var fieldpath = path || root || [];
  return /*#__PURE__*/_react["default"].createElement(_LabelField["default"], {
    name: fieldpath,
    label: title,
    schema: schema,
    valuePropName: 'checked',
    dependencies: []
  }, function (control, meta) {
    return /*#__PURE__*/_react["default"].createElement(_checkbox["default"], _extends({}, control, {
      id: meta.name.join('.')
    }));
  });
};

var _default = CheckboxEditor;
exports["default"] = _default;