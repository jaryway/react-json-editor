import React, { useImperativeHandle, useContext, useEffect } from 'react';
import Form from 'rc-field-form';
import JsonEditorContext, { JsonEditorProvider as Provider } from "./JsonEditorContext";
import { JsonEditorFormProvider } from "./JsonEditorFormContext";
import { getEditorClass } from "./utils/editorUtil";
import 'antd/lib/button/style/index.less';
import 'antd/lib/form/style/index.less';
import 'antd/lib/card/style/index.less';
import 'antd/lib/table/style/index.less';
import 'style';

var InterbalJsonEditor = function InterbalJsonEditor(_ref, ref) {
  var schema = _ref.schema,
      value = _ref.value,
      form = _ref.form,
      root = _ref.root,
      onChange = _ref.onChange;

  var _useContext = useContext(JsonEditorContext),
      options = _useContext.options;

  var resolvers = options.resolvers,
      editors = options.editors;
  var EditorComponent = getEditorClass(schema, resolvers, editors);
  useImperativeHandle(ref, function () {});
  useEffect(function () {
    console.log('___json.editor.ready');
  }, []);
  return /*#__PURE__*/React.createElement(JsonEditorFormProvider, {
    form: form,
    root: root || []
  }, /*#__PURE__*/React.createElement(Form, {
    form: form,
    initialValues: value,
    className: 'ant-form ant-form-vertical',
    onValuesChange: function onValuesChange(_, values) {
      onChange && onChange(values);
    }
  }, EditorComponent && /*#__PURE__*/React.createElement(EditorComponent, {
    schema: schema
  })));
};

var ForwardJsonEditor = /*#__PURE__*/React.forwardRef(InterbalJsonEditor);
var JsonEditor = ForwardJsonEditor;
JsonEditor.Provider = Provider;
export { Provider };
export default JsonEditor;