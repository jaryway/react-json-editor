import "antd/es/button/style";
import _Button from "antd/es/button";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import React, { useContext } from 'react';
import { List } from 'rc-field-form';
import classNames from 'classnames';
import * as editors from "./index";
import JsonEditorFormContext from "../JsonEditorFormContext";

var ArrayEditor = function ArrayEditor(_ref) {
  var schema = _ref.schema,
      path = _ref.path;

  var _useContext = useContext(JsonEditorFormContext),
      root = _useContext.root,
      hiddenMap = _useContext.hiddenMap;

  var items = schema.items || {};
  var Component = editors[(items || {}).type];
  items.parent = schema;

  if (schema.format === 'table') {
    items.format = 'table_row';
  }

  return /*#__PURE__*/React.createElement(List, {
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
    return /*#__PURE__*/React.createElement("div", {
      className: 'je-array-item ant-card ant-card-bordered ant-card-small'
    }, items.title && /*#__PURE__*/React.createElement("div", {
      className: 'ant-card-head',
      style: {
        borderBottom: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: 'ant-card-head-wrapper'
    }, /*#__PURE__*/React.createElement("label", {
      className: 'ant-card-head-title'
    }, items.title))), /*#__PURE__*/React.createElement("div", {
      className: 'ant-card-body'
    }, /*#__PURE__*/React.createElement("table", {
      style: {
        display: 'block',
        clear: 'both'
      }
    }, fields.length > 0 && /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, Object.entries(items.properties || {}).map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          k = _ref4[0],
          v = _ref4[1];

      var reg = new RegExp("".concat(meta.name.join('.'), "\\.\\d{1,}\\.").concat(k));
      if (hiddenMap && Object.keys(hiddenMap).some(function (key) {
        return reg.test(key) && hiddenMap[key];
      })) return null;
      return /*#__PURE__*/React.createElement("th", {
        style: {
          padding: '8px 0'
        },
        key: k
      }, v.title || k);
    }), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, fields.map(function (field, index, arr) {
      return /*#__PURE__*/React.createElement("tr", {
        key: "row-".concat(index)
      }, Component && /*#__PURE__*/React.createElement(Component, {
        key: field.key,
        schema: items,
        path: [index],
        title: items.title || field.key
      }), /*#__PURE__*/React.createElement("td", {
        className: 'je-object-item je-array-item operation-row',
        style: {
          verticalAlign: 'top'
        }
      }, /*#__PURE__*/React.createElement(_Button, {
        onClick: function onClick() {
          return remove(index);
        }
      }, "\u5220\u9664"), arr.length > 1 && index - 1 >= 0 && /*#__PURE__*/React.createElement(_Button, {
        onClick: function onClick() {
          return move(index, index - 1);
        }
      }, "\u4E0A\u79FB"), arr.length > 1 && index + 1 < arr.length && /*#__PURE__*/React.createElement(_Button, {
        onClick: function onClick() {
          return move(index, index + 1);
        }
      }, "\u4E0B\u79FB")));
    }))), /*#__PURE__*/React.createElement("table", {
      style: {
        display: 'block',
        clear: 'both'
      }
    }, /*#__PURE__*/React.createElement("tfoot", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '0px 0'
      },
      className: classNames({
        'has-error': errors.length
      })
    }, /*#__PURE__*/React.createElement("button", {
      className: 'ant-btn ant-btn-primary',
      onClick: function onClick(event) {
        event.persist();
        add();
      }
    }, "\u6DFB\u52A0\u9879"), /*#__PURE__*/React.createElement("span", {
      className: 'ant-form-item-explain ant-form-explain'
    }, errors[0])))))));
  });
};

export default ArrayEditor;