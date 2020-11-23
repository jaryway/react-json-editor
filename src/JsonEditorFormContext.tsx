import React, { useRef, useState, useCallback } from 'react';
import { Schema } from './interfaces';
import { InternalNamePath, FormInstance } from 'rc-field-form/es/interface';
import { matchNamePath } from './utils/valueUtil';
import NameMap from './utils/NameMap';
import Event from './utils/Event';
const event = new Event();
let timerId: any;
export interface JsonEditorFormProviderProps {
  form?: FormInstance;
  root?: string[];
  // dependencySet?: NameMap<{ [k: string]: any }>;
  // visibleSet?: NameMap<NameMap<{ expect: any | any[]; value: any }>>;
  // fieldKeySet?: InternalNamePath[];
}

export interface JsonEditorFormContextProps extends JsonEditorFormProviderProps {
  notify?: (path: InternalNamePath, value: any) => void;
  // // 字段集合
  // fieldKeySet?: InternalNamePath[];
  // checkVisible: (path: InternalNamePath) => boolean;
  hiddenMap: { [k: string]: boolean };
  registerField?: (path: InternalNamePath, schema: Schema) => (path: InternalNamePath) => void;
}

function getRoot(root?: string | string[]) {
  if (root === undefined || root === null || root === '') return [];
  if (Array.isArray(root)) return root;
  return [root];
}

/**
 * 1、挂载组件，并注册组件，
 * 2、组件注册完成，注册依赖
 * 3、根据依赖，初始化 value 集合和 hidden 集合
 * 4、隐藏字段的时候吧值设置为undefined
 */

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

  function checkVisible(path: InternalNamePath) {
    const v = valueSet.current.get(path); // 拿到 path 字段依赖的字段的值集合
    // console.log('checkVisible', valueSet, v, path);
    // 没有依赖项，不隐藏
    if (!v) return true;

    const dependencies = v.map((m) => m.value);

    // 依赖项不存在
    if (dependencies.length === 0) return true;

    const res = dependencies.some((m) => {
      if (Array.isArray(m.expect)) return m.expect.includes(m.value);
      return m.expect === m.value;
    });

    return res;
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
        // 当监听的对象发生变化时，更新依赖项的值
        event.subscribe(dependencypath, (value) => {
          valueSet.current.update(path, (origin: any) => {
            origin.update(dependencypath, (m: any) => ({ ...m, value }));
            return origin;
          });

          setHiddenState((prevState) => {
            // 没有发生变化，直接返回原来的 state
            if (prevState[key] === !checkVisible(path)) return prevState;
            return { ...prevState, [key]: !prevState[key] };
          });
        });
      });

      valueSet.current.set(path, initialValue);
      setHiddenState((prevState) => {
        return { ...prevState, [key]: !checkVisible(path) };
      });
    },
    [form]
  );

  const registerField = useCallback(
    (path: InternalNamePath, schema: Schema) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        dependencySet.current.forEach((m) => registerDependencies(m.key, m.value, rootpath));
      }, 100);

      fieldKeySet.current.push(path);
      if (schema?.options?.dependencies) {
        dependencySet.current.set(path, schema.options.dependencies);
      }

      return (path: InternalNamePath) => {
        fieldKeySet.current = fieldKeySet.current.filter((m) => !matchNamePath(m, path));
        dependencySet.current.delete(path);
      };
    },
    [registerDependencies, rootpath]
  );

  // useEffect(() => {
  //   console.log('test.jsonEditorFormContext.mount');
  //   return () => {
  //     console.log('test.jsonEditorFormContext.unmount');
  //   };
  // }, []);

  console.log('test.jsonEditorFormContext.render', { valueSet, hiddenState });

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
