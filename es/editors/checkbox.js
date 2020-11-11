import "antd/es/checkbox/style";
import _Checkbox from "antd/es/checkbox";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import LabelField from "../components/LabelField";
import JsonEditorFormContext from "../JsonEditorFormContext";

var CheckboxEditor = function CheckboxEditor(_ref) {
  var schema = _ref.schema,
      path = _ref.path,
      title = _ref.title;

  var _React$useContext = React.useContext(JsonEditorFormContext),
      root = _React$useContext.root;

  var fieldpath = path || root || [];
  return /*#__PURE__*/React.createElement(LabelField, {
    name: fieldpath,
    label: title,
    schema: schema,
    valuePropName: 'checked',
    dependencies: []
  }, function (control, meta) {
    return /*#__PURE__*/React.createElement(_Checkbox, _extends({}, control, {
      id: meta.name.join('.')
    }));
  });
};

export default CheckboxEditor;