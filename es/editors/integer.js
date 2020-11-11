import "antd/es/input-number/style";
import _InputNumber from "antd/es/input-number";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import LabelField from "../components/LabelField";
import JsonEditorFormContext from "../JsonEditorFormContext";

var IntegerEditor = function IntegerEditor(_ref) {
  var schema = _ref.schema,
      path = _ref.path,
      title = _ref.title;
  var min = schema.min,
      max = schema.max,
      step = schema.step;

  var _React$useContext = React.useContext(JsonEditorFormContext),
      root = _React$useContext.root;

  var fieldpath = path || root || [];
  return /*#__PURE__*/React.createElement(LabelField, {
    name: fieldpath,
    label: title,
    schema: schema
  }, function (control) {
    return /*#__PURE__*/React.createElement(_InputNumber, _extends({}, control, {
      step: step,
      min: min,
      max: max
    }));
  });
};

export default IntegerEditor;