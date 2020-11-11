import "antd/es/date-picker/style";
import _DatePicker from "antd/es/date-picker";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import LabelField from "../components/LabelField";
import JsonEditorFormContext from "../JsonEditorFormContext";

var DateTimeEditor = function DateTimeEditor(_ref) {
  var schema = _ref.schema,
      path = _ref.path,
      title = _ref.title;

  var _React$useContext = React.useContext(JsonEditorFormContext),
      root = _React$useContext.root;

  var format = schema.format;
  var showTime = format === 'datetime';
  var fieldpath = path || root || [];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LabelField, {
    name: fieldpath,
    label: title,
    schema: schema
  }, function (control) {
    return /*#__PURE__*/React.createElement(_DatePicker, _extends({}, control, {
      showTime: showTime
    }));
  }));
};

export default DateTimeEditor;