import React, { useEffect } from 'react';
import { Resolver } from './interfaces';
import { resolvers as defaultResolvers } from './resolvers';
import * as defaultEditors from './editors';

export interface JsonEditorProviderProps {
  options: {
    resolvers: Resolver[];
    editors: { [k: string]: React.FC<any> };
  };
}

export interface JsonEditorContextProps extends JsonEditorProviderProps {}

const JsonEditorContext = React.createContext<JsonEditorContextProps>({ options: { resolvers: [], editors: {} } });

const JsonEditorProvider: React.FC<JsonEditorProviderProps> = ({ children, options }) => {
  const editorContext = React.useContext(JsonEditorContext);
  // const visibleset = useRef<NameMap<NameMap<{ expect: any | any[]; value: any }>>>(new NameMap<NameMap<{ expect: any | any[]; value: any }>>());

  // 合并解析器
  let resolvers = defaultResolvers;
  if (options && options.resolvers) {
    if (!Array.isArray(options.resolvers)) {
      console.warn('options.resolvers 参数应为数组');
    } else {
      resolvers = resolvers.concat(options.resolvers);
    }
  }

  useEffect(() => {
    // console.log('test1.jsonEditorContext.mount');
  }, []);

  return (
    <JsonEditorContext.Provider
      value={{
        ...editorContext,

        options: {
          ...options,
          resolvers,
          editors: defaultEditors,
        },
      }}
    >
      {children}
    </JsonEditorContext.Provider>
  );
};

export { JsonEditorProvider };

export default JsonEditorContext;
