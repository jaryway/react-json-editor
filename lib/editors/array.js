"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _react = _interopRequireWildcard(require("react"));

var _rcFieldForm = require("rc-field-form");

var _classnames = _interopRequireDefault(require("classnames"));

var editors = _interopRequireWildcard(require("./index"));

var _JsonEditorFormContext = _interopRequireDefault(require("../JsonEditorFormContext"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var ArrayEditor = function ArrayEditor(_ref) {
  var schema = _ref.schema,
      path = _ref.path;

  var _useContext = (0, _react.useContext)(_JsonEditorFormContext["default"]),
      root = _useContext.root,
      hiddenMap = _useContext.hiddenMap;

  var items = schema.items || {};
  var Component = editors[(items || {}).type];
  items.parent = schema;

  if (schema.format === 'table') {
    items.format = 'table_row';
  }

  return /*#__PURE__*/_react["default"].createElement(_rcFieldForm.List, {
    validateTrigger: 'onChange',
    name: path || root || [],
    rules: [{
      type: 'array',
      required: true
    }]
  }, function (fields, _ref2, _a) {
    var add = _ref2.add,
        remove = _ref2.remove,
        move = _ref2.move;

    var errors = _a.errors,
        meta = __rest(_a, ["errors"]);

    console.log('fieldfield', errors);
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: 'je-array-item ant-card ant-card-bordered ant-card-small'
    }, items.title && /*#__PURE__*/_react["default"].createElement("div", {
      className: 'ant-card-head',
      style: {
        borderBottom: 0
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: 'ant-card-head-wrapper'
    }, /*#__PURE__*/_react["default"].createElement("label", {
      className: 'ant-card-head-title'
    }, items.title))), /*#__PURE__*/_react["default"].createElement("div", {
      className: 'ant-card-body'
    }, /*#__PURE__*/_react["default"].createElement("table", {
      style: {
        display: 'block',
        clear: 'both'
      }
    }, fields.length > 0 && /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, Object.entries(items.properties || {}).map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          k = _ref4[0],
          v = _ref4[1];

      var reg = new RegExp("".concat(meta.name.join('.'), "\\.\\d{1,}\\.").concat(k));
      if (hiddenMap && Object.keys(hiddenMap).some(function (key) {
        return reg.test(key) && hiddenMap[key];
      })) return null;
      return /*#__PURE__*/_react["default"].createElement("th", {
        style: {
          padding: '8px 0'
        },
        key: k
      }, v.title || k);
    }), /*#__PURE__*/_react["default"].createElement("th", null))), /*#__PURE__*/_react["default"].createElement("tbody", null, fields.map(function (field, index, arr) {
      return /*#__PURE__*/_react["default"].createElement("tr", {
        key: "row-".concat(index)
      }, Component && /*#__PURE__*/_react["default"].createElement(Component, {
        key: field.key,
        schema: items,
        path: [index],
        title: items.title || field.key
      }), /*#__PURE__*/_react["default"].createElement("td", {
        className: 'je-object-item je-array-item operation-row',
        style: {
          verticalAlign: 'top'
        }
      }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
        onClick: function onClick() {
          return remove(index);
        }
      }, "\u5220\u9664"), arr.length > 1 && index - 1 >= 0 && /*#__PURE__*/_react["default"].createElement(_button["default"], {
        onClick: function onClick() {
          return move(index, index - 1);
        }
      }, "\u4E0A\u79FB"), arr.length > 1 && index + 1 < arr.length && /*#__PURE__*/_react["default"].createElement(_button["default"], {
        onClick: function onClick() {
          return move(index, index + 1);
        }
      }, "\u4E0B\u79FB")));
    }))), /*#__PURE__*/_react["default"].createElement("table", {
      style: {
        display: 'block',
        clear: 'both'
      }
    }, /*#__PURE__*/_react["default"].createElement("tfoot", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
      style: {
        padding: '0px 0'
      },
      className: (0, _classnames["default"])({
        'has-error': errors.length
      })
    }, /*#__PURE__*/_react["default"].createElement("button", {
      className: 'ant-btn ant-btn-primary',
      onClick: function onClick(event) {
        event.persist();
        add();
      }
    }, "\u6DFB\u52A0\u9879"), /*#__PURE__*/_react["default"].createElement("span", {
      className: 'ant-form-item-explain ant-form-explain'
    }, errors[0])))))));
  });
};

var _default = ArrayEditor;
exports["default"] = _default;