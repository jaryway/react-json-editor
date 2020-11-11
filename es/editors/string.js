import "antd/es/input/style";
import _Input from "antd/es/input";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import LabelField from "../components/LabelField";
import JsonEditorFormContext from "../JsonEditorFormContext";

var StringEditor = function StringEditor(_ref) {
  var path = _ref.path,
      title = _ref.title,
      schema = _ref.schema;

  var _React$useContext = React.useContext(JsonEditorFormContext),
      root = _React$useContext.root;

  var fieldpath = path || root || [];
  return /*#__PURE__*/React.createElement(LabelField, {
    name: fieldpath,
    label: title,
    schema: schema
  }, function (control, meta) {
    return /*#__PURE__*/React.createElement(_Input, _extends({}, control, {
      "data-schemapath": meta.name.join('.')
    }));
  });
};

export default StringEditor;