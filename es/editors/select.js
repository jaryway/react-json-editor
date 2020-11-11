import "antd/es/select/style";
import _Select from "antd/es/select";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import LabelField from "../components/LabelField";
import JsonEditorFormContext from "../JsonEditorFormContext";
var Option = _Select.Option;

var SelectEditor = function SelectEditor(_ref) {
  var schema = _ref.schema,
      path = _ref.path,
      title = _ref.title;

  var _React$useContext = React.useContext(JsonEditorFormContext),
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

  return /*#__PURE__*/React.createElement(LabelField, {
    name: fieldpath,
    label: title,
    schema: schema
  }, function (control) {
    return /*#__PURE__*/React.createElement(_Select, _extends({}, control), options.map(function (option) {
      return /*#__PURE__*/React.createElement(Option, {
        key: "".concat(option.value),
        value: option.value
      }, option.label);
    }));
  });
};

export default SelectEditor;