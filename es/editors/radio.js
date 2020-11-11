import "antd/es/radio/style";
import _Radio from "antd/es/radio";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import LabelField from "../components/LabelField";
import JsonEditorFormContext from "../JsonEditorFormContext";

var RadioEditor = function RadioEditor(_ref) {
  var path = _ref.path,
      title = _ref.title,
      schema = _ref.schema;

  var _React$useContext = React.useContext(JsonEditorFormContext),
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
  return /*#__PURE__*/React.createElement(LabelField, {
    name: fieldpath,
    label: title,
    schema: schema
  }, function (control) {
    if (mode === 'button') return /*#__PURE__*/React.createElement(_Radio.Group, _extends({}, control), options.map(function (m) {
      return /*#__PURE__*/React.createElement(_Radio.Button, {
        key: m.value,
        value: m.value
      }, m.label);
    }));
    return /*#__PURE__*/React.createElement(_Radio.Group, _extends({}, control, {
      options: options
    }));
  });
};

export default RadioEditor;