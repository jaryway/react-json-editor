function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useContext } from 'react';
import classnames from 'classnames';
import JsonEditorContext from "../JsonEditorContext";
import { getEditorClass } from "../utils/editorUtil";
import JsonEditorFormContext from "../JsonEditorFormContext";

var Wrapper = function Wrapper(_ref) {
  var format = _ref.format,
      path = _ref.path,
      title = _ref.title,
      children = _ref.children;
  var isTableRow = format === 'table_row';
  if (isTableRow) return /*#__PURE__*/React.createElement(React.Fragment, null, children);
  return /*#__PURE__*/React.createElement("div", {
    "data-schematype": 'object',
    className: classnames('ant-card  ant-card-small', {
      'ant-card-bordered': path.length > 1
    })
  }, title && /*#__PURE__*/React.createElement("div", {
    className: 'ant-card-head',
    style: {
      borderBottom: 0,
      paddingLeft: 0,
      paddingRight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: 'ant-card-head-wrapper'
  }, /*#__PURE__*/React.createElement("label", {
    className: 'ant-card-head-title'
  }, title))), /*#__PURE__*/React.createElement("div", {
    className: 'ant-card-body'
  }, children));
};

var ChildWrapper = function ChildWrapper(_ref2) {
  var format = _ref2.format,
      children = _ref2.children;
  var isTableRow = format === 'table_row';
  if (isTableRow) return /*#__PURE__*/React.createElement("td", {
    className: 'je-object-item'
  }, children);
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
};

var ObjectEditor = function ObjectEditor(_ref3) {
  var schema = _ref3.schema,
      _ref3$path = _ref3.path,
      path = _ref3$path === void 0 ? [] : _ref3$path;

  var _useContext = useContext(JsonEditorContext),
      options = _useContext.options;

  var _React$useContext = React.useContext(JsonEditorFormContext),
      root = _React$useContext.root;

  var fieldpath = path || root || [];

  var _ref4 = options || {},
      _ref4$resolvers = _ref4.resolvers,
      resolvers = _ref4$resolvers === void 0 ? [] : _ref4$resolvers,
      editors = _ref4.editors;

  var format = schema.format;
  return /*#__PURE__*/React.createElement(Wrapper, {
    title: schema.title,
    format: format,
    path: fieldpath
  }, Object.entries(schema.properties || {}).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        childSchema = _ref6[1];

    childSchema.parent = schema;
    var Component = getEditorClass(childSchema, resolvers || [], editors);
    return /*#__PURE__*/React.createElement(ChildWrapper, {
      format: format,
      key: key
    }, Component && /*#__PURE__*/React.createElement(Component, {
      key: key,
      schema: childSchema,
      path: [].concat(_toConsumableArray(fieldpath), [key]),
      title: childSchema.title || key
    }));
  }));
};

export default ObjectEditor;