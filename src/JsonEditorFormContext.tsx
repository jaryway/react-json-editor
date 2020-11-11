import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Schema } from './interfaces';
import { InternalNamePath, FormInstance } from 'rc-field-form/es/interface';
import { matchNamePath } from './utils/valueUtil';
import NameMap from './utils/NameMap';
import Event from './utils/Event';
const event = new Event();

export interface JsonEditorFormProviderProps {
  form?: FormInstance;
  root?: string[];
  // dependencySet?: NameMap<{ [k: string]: any }>;
  // visibleSet?: NameMap<NameMap<{ expect: any | any[]; value: any }>>;
  // fieldKeySet?: InternalNamePath[];
  hiddenMap?: { [k: string]: boolean };
}

export interface JsonEditorFormContextProps extends JsonEditorFormProviderProps {
  notify?: (path: InternalNamePath, value: any) => void;
  // // 字段集合
  // fieldKeySet?: InternalNamePath[];
  registerField?: (path: InternalNamePath, schema: Schema) => (path: InternalNamePath) => void;
}

function getRoot(root?: string | string[]) {
  if (root === undefined || root === null || root === '') return [];
  if (Array.isArray(root)) return root;
  return [root];
}

const JsonEditorFormContext = React.createContext<JsonEditorFormContextProps>({ hiddenMap: {} });

const JsonEditorFormProvider: React.FC<JsonEditorFormProviderProps> = ({ root = [], children, form }) => {
  const editorContext = React.useContext(JsonEditorFormContext);
  const dependencySet = useRef<NameMap<{ [k: string]: any }>>(new NameMap<{ [k: string]: any }>());
  const valueSet = useRef<NameMap<NameMap<{ expect: any | any[]; value: any }>>>(new NameMap<NameMap<{ expect: any | any[]; value: any }>>());
  const fieldKeySet = useRef<InternalNamePath[]>([]); // 字段集合
  const [hiddenState, setHiddenState] = useState<{ [k: string]: boolean }>({});
  const rootpath = getRoot(root);

  function notify(path: InternalNamePath, value: any) {
    event.publish(path, value);
  }

  function isVisible(path: InternalNamePath) {
    const v = valueSet.current.get(path);

    if (!v) return false;

    const dependencies = v.map((m) => m.value);
    // 依赖项不存在
    if (dependencies.length === 0) return false;

    const res = dependencies.some((m) => {
      if (Array.isArray(m.expect)) return m.expect.includes(m.value);

      return m.expect === m.value;
    });

    return !res;
  }

  const registerDependencies = useCallback(
    function (path: InternalNamePath, dependencies: { [k: string]: any }, root: string[]) {
      const initialValue = new NameMap<{ expect: any[]; value: any }>();
      const key = path.join('.');

      //
      Object.entries(dependencies || {}).forEach(([dependency, v]) => {
        const dependencypath = root.concat(dependency.split('.'));

        // 依赖的对象不存在，不监听
        if (!fieldKeySet.current.some((m) => matchNamePath(m, dependencypath))) return;

        const value = (form as FormInstance).getFieldValue(dependencypath);
        initialValue.set(dependencypath, { expect: v, value });

        // dependencypath 发生变化，改变 path 的值
        event.subscribe(dependencypath, (value) => {
          // console.log('___handlers.fire.handler', value);

          valueSet.current.update(path, (origin: any) => {
            // console.log('___handlers.fire.handler', origin);
            origin.update(dependencypath, (m: any) => ({ ...m, value }));
            return origin;
          });

          setHiddenState((prevState) => {
            // 没有发生变化，直接返回原来的 state
            if (prevState[key] === isVisible(path)) return prevState;
            return { ...prevState, [key]: isVisible(path) };
          });
        });
      });

      valueSet.current.set(path, initialValue);
    },
    [form]
  );

  const registerField = useCallback(
    (path: InternalNamePath, schema: Schema) => {
      // console.log('___handlers.registerField', path, schema);
      fieldKeySet.current.push(path);
      if (schema?.options?.dependencies) {
        dependencySet.current.set(path, schema.options.dependencies);
      }

      return (path: InternalNamePath) => {
        fieldKeySet.current = fieldKeySet.current.filter((m) => !matchNamePath(m, path));

        setHiddenState((prevState) => {
          const res = Object.entries(prevState)
            .filter(([k]) => path.join('.') !== k)
            .reduce((prev, [k, v]) => {
              return { ...prev, [k]: v };
            }, {});

          return res;
        });
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hiddenState]
  );

  useEffect(() => {
    // 注册依赖处理器;
    dependencySet.current.forEach((m) => registerDependencies(m.key, m.value, rootpath));
    var initialHiddenMap: { [k: string]: boolean } = {};
    dependencySet.current.forEach((m) => {
      initialHiddenMap = { ...initialHiddenMap, ...{ [m.key.join('.')]: isVisible(m.key) } };
    });
    setHiddenState((prevState) => ({ ...prevState, ...initialHiddenMap }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootpath]);

  useEffect(() => {
    console.log('___json.context.ready', valueSet.current);
  }, []);
  // console.log('___json.context.cancel', fieldKeySet.current, hiddenState);

  return (
    <JsonEditorFormContext.Provider
      value={{
        ...editorContext,
        root: rootpath,
        notify,
        registerField,
        hiddenMap: hiddenState,
      }}
    >
      {children}
    </JsonEditorFormContext.Provider>
  );
};

export { JsonEditorFormProvider };

export default JsonEditorFormContext;
