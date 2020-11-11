"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Provider", {
  enumerable: true,
  get: function get() {
    return _JsonEditorContext.JsonEditorProvider;
  }
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rcFieldForm = _interopRequireDefault(require("rc-field-form"));

var _JsonEditorContext = _interopRequireWildcard(require("./JsonEditorContext"));

var _JsonEditorFormContext = require("./JsonEditorFormContext");

var _editorUtil = require("./utils/editorUtil");

require("antd/lib/button/style/index.less");

require("antd/lib/form/style/index.less");

require("antd/lib/card/style/index.less");

require("antd/lib/table/style/index.less");

require("style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var InterbalJsonEditor = function InterbalJsonEditor(_ref, ref) {
  var schema = _ref.schema,
      value = _ref.value,
      form = _ref.form,
      root = _ref.root,
      onChange = _ref.onChange;

  var _useContext = (0, _react.useContext)(_JsonEditorContext["default"]),
      options = _useContext.options;

  var resolvers = options.resolvers,
      editors = options.editors;
  var EditorComponent = (0, _editorUtil.getEditorClass)(schema, resolvers, editors);
  (0, _react.useImperativeHandle)(ref, function () {});
  (0, _react.useEffect)(function () {
    console.log('___json.editor.ready');
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_JsonEditorFormContext.JsonEditorFormProvider, {
    form: form,
    root: root || []
  }, /*#__PURE__*/_react["default"].createElement(_rcFieldForm["default"], {
    form: form,
    initialValues: value,
    className: 'ant-form ant-form-vertical',
    onValuesChange: function onValuesChange(_, values) {
      onChange && onChange(values);
    }
  }, EditorComponent && /*#__PURE__*/_react["default"].createElement(EditorComponent, {
    schema: schema
  })));
};

var ForwardJsonEditor = /*#__PURE__*/_react["default"].forwardRef(InterbalJsonEditor);

var JsonEditor = ForwardJsonEditor;
JsonEditor.Provider = _JsonEditorContext.JsonEditorProvider;
var _default = JsonEditor;
exports["default"] = _default;