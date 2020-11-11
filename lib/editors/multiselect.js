"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/select/style");

var _select = _interopRequireDefault(require("antd/lib/select"));

require("antd/lib/checkbox/style");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

var _react = _interopRequireDefault(require("react"));

var _LabelField = _interopRequireDefault(require("../components/LabelField"));

var _JsonEditorFormContext = _interopRequireDefault(require("../JsonEditorFormContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function sanitize(value, schema) {
  var _a, _b, _c;

  if (((_a = schema === null || schema === void 0 ? void 0 : schema.items) === null || _a === void 0 ? void 0 : _a.type) === 'boolean') return !!value;else if (((_b = schema === null || schema === void 0 ? void 0 : schema.items) === null || _b === void 0 ? void 0 : _b.type) === 'number') return 1 * value || 0;else if (((_c = schema === null || schema === void 0 ? void 0 : schema.items) === null || _c === void 0 ? void 0 : _c.type) === 'integer') return Math.floor(value * 1 || 0);
  return "".concat(value);
}

var CheckboxGroup = _checkbox["default"].Group;
var Option = _select["default"].Option;

var MultiSelectEditor = function MultiSelectEditor(_ref) {
  var schema = _ref.schema,
      path = _ref.path,
      title = _ref.title;

  var _React$useContext = _react["default"].useContext(_JsonEditorFormContext["default"]),
      root = _React$useContext.root;

  var fieldpath = path || root || [];
  var itemsSchema = schema.items;
  var e = (itemsSchema === null || itemsSchema === void 0 ? void 0 : itemsSchema["enum"]) || [];
  var t = (itemsSchema === null || itemsSchema === void 0 ? void 0 : itemsSchema.options) ? itemsSchema.options.enum_titles || [] : [];
  var options = e.filter(function (m) {
    return sanitize(m, schema) === m;
  }).map(function (m, i) {
    return {
      value: m,
      label: t[i] || m
    };
  });
  return /*#__PURE__*/_react["default"].createElement(_LabelField["default"], {
    name: fieldpath,
    label: title,
    schema: schema,
    valuePropName: 'checked'
  }, function (control) {
    if (schema.format === 'checkbox') return /*#__PURE__*/_react["default"].createElement(CheckboxGroup, _extends({}, control, {
      options: options
    }));
    return /*#__PURE__*/_react["default"].createElement(_select["default"], _extends({
      mode: 'multiple'
    }, control), options.map(function (m) {
      return /*#__PURE__*/_react["default"].createElement(Option, {
        key: m.value,
        value: m.value
      }, m.label);
    }));
  });
};

var _default = MultiSelectEditor;
exports["default"] = _default;