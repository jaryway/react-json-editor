"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcFieldForm = require("rc-field-form");

var _rules = require("../rules");

var _JsonEditorFormContext = _interopRequireDefault(require("../JsonEditorFormContext"));

var _valueUtil = require("rc-field-form/es/utils/valueUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var FieldError = function FieldError(_ref) {
  var children = _ref.children;
  if (children.length > 0) return /*#__PURE__*/_react["default"].createElement("div", {
    className: 'ant-form-item-explain ant-form-explain'
  }, /*#__PURE__*/_react["default"].createElement("div", {
    role: 'alert'
  }, children));
  return null;
};

function getValue(event) {
  if (_typeof(event) === 'object' && 'target' in event) {
    var _event$target = event.target,
        value = _event$target.value,
        checked = _event$target.checked;
    if (value !== undefined) return value;
    if (checked !== undefined) return checked;
  }

  return event;
}

var Control = function Control(_ref2) {
  var control = _ref2.control,
      meta = _ref2.meta,
      form = _ref2.form,
      children = _ref2.children,
      required = _ref2.required,
      schema = _ref2.schema,
      label = _ref2.label;

  var _a;

  var _useContext = (0, _react.useContext)(_JsonEditorFormContext["default"]),
      notify = _useContext.notify,
      registerField = _useContext.registerField,
      hiddenMap = _useContext.hiddenMap;

  var needHtmlFor = schema.type === 'boolean' && schema.format === 'checkbox';
  var hasError = meta.errors.length;
  var format = (_a = schema.parent) === null || _a === void 0 ? void 0 : _a.format;

  var onChange = function onChange() {
    for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }

    var event = rest[0];
    notify && notify(meta.name, getValue(event));
    return control.onChange.apply(control, rest);
  };

  (0, _react.useEffect)(function () {
    var cancelRegisterField = registerField && registerField(meta.name, schema);
    return function () {
      console.log('___path.cancelRegisterField', meta.name);
      cancelRegisterField && cancelRegisterField(meta.name);
    };
  }, []);

  var ctrl = _extends(_extends({}, control), {
    onChange: onChange
  });

  var childNode = typeof children === 'function' ? children(ctrl, meta, form) : /*#__PURE__*/_react["default"].cloneElement(children, _extends({}, ctrl));
  if (hiddenMap && hiddenMap[meta.name.join('.')]) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])('je-field ant-row ant-form-item', {
      'has-error': hasError
    })
  }, format !== 'table_row' && /*#__PURE__*/_react["default"].createElement("div", {
    className: 'ant-col ant-form-item-label'
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: needHtmlFor && meta.name.join('.') || undefined,
    className: (0, _classnames["default"])({
      'ant-form-item-required': required
    })
  }, label || name)), /*#__PURE__*/_react["default"].createElement("div", {
    className: 'ant-col ant-form-item-control-wrapper'
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: 'ant-form-item-control'
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: 'ant-form-item-children'
  }, childNode), /*#__PURE__*/_react["default"].createElement(FieldError, null, meta.errors))));
};

var LabelField = function LabelField(_a) {
  var name = _a.name,
      label = _a.label,
      children = _a.children,
      schema = _a.schema,
      rules = _a.rules,
      rest = __rest(_a, ["name", "label", "children", "schema", "rules"]);

  var mergedRules = [].concat(_toConsumableArray((0, _rules.getRules)(schema, (0, _valueUtil.getNamePath)(name || [])) || []), _toConsumableArray(rules || []));
  var required = mergedRules.some(function (rule) {
    return rule.required;
  });
  return /*#__PURE__*/_react["default"].createElement(_rcFieldForm.Field, _extends({
    name: name,
    rules: mergedRules
  }, rest), function (control, meta, form) {
    return /*#__PURE__*/_react["default"].createElement(Control, _extends({}, {
      control: control,
      meta: meta,
      form: form,
      required: required,
      schema: schema,
      label: label,
      children: children
    }));
  });
};

var _default = /*#__PURE__*/_react["default"].memo(LabelField);

exports["default"] = _default;