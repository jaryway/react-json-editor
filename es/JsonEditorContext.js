function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect } from 'react';
import { resolvers as defaultResolvers } from "./resolvers";
import * as defaultEditors from "./editors";
var JsonEditorContext = /*#__PURE__*/React.createContext({
  options: {
    resolvers: [],
    editors: {}
  }
});

var JsonEditorProvider = function JsonEditorProvider(_ref) {
  var children = _ref.children,
      options = _ref.options;
  var editorContext = React.useContext(JsonEditorContext);
  var resolvers = defaultResolvers;

  if (options && options.resolvers) {
    if (!Array.isArray(options.resolvers)) {
      console.warn('options.resolvers 参数应为数组');
    } else {
      resolvers = resolvers.concat(options.resolvers);
    }
  }

  useEffect(function () {
    console.log('___json.context.ready');
  }, []);
  return /*#__PURE__*/React.createElement(JsonEditorContext.Provider, {
    value: _extends(_extends({}, editorContext), {
      options: _extends(_extends({}, options), {
        resolvers: resolvers,
        editors: defaultEditors
      })
    })
  }, children);
};

export { JsonEditorProvider };
export default JsonEditorContext;