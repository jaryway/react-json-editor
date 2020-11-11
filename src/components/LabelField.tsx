import React, { useContext, useEffect } from 'react';
import classnames from 'classnames';
import { Field } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/es/Field';
import { getRules } from '../rules';
import { Schema } from '../interfaces';
import { Meta, FormInstance, Rule } from 'rc-field-form/es/interface';
import JsonEditorFormContext from '../JsonEditorFormContext';
import { getNamePath } from 'rc-field-form/es/utils/valueUtil';

const FieldError: React.FC<any> = ({ children }) => {
  if (children.length > 0)
    return (
      <div className='ant-form-item-explain ant-form-explain'>
        <div role='alert'>{children}</div>
      </div>
    );
  return null;
};

interface LabelFieldProps extends FieldProps {
  schema: Schema;
  label?: React.ReactNode;
  required?: boolean;
}

interface ContolProps {
  control: { [name: string]: any };
  meta: Meta;
  form: FormInstance;
  required: boolean;
  schema: Schema;
  label: any;
}

/**
 * 假如此人的性别为男，则显示是否留胡子字段
 * 字段 gender
 * 字段 hasBeard
 * 我们就说 hasBeard 依赖 gender 条件为值等于“man”
 * 当 gender 改变时，去改变 hasBeard 字段是否显示
 *
 * { hasBeard:{ dependencies:[{ gender : 'man' }] } } => {'path':[{'dependency1':value},{'dependency2':value}] }
 * dependencies={"hasBeard":[{"gender":"man"}],"other":[{"gender":"man"}]}
 *
 * {"gender":[{"hasBeard":["man","faman"]},{"other":"faman"}]}
 *
 * visiblemap = {"hasBeard":false}=>{"hasBeard":true}
 * dependencies = [{key:"gender","dependency":"gender",expect:['aaa','xxcxcxcvc'],value:['aaaa']}]
 *
 * gender => changed => 找到我所有的依赖者 => true
 *
 * 用一个变量去存 所有的被依赖的项
 *
 */
function getValue(event: any) {
  // console.log('_getValue', event);
  if (typeof event === 'object' && 'target' in event) {
    const { value, checked } = event.target as any;
    if (value !== undefined) return value;
    if (checked !== undefined) return checked;
  }

  return event;
}

const Control: React.FC<ContolProps> = ({ control, meta, form, children, required, schema, label }) => {
  const { notify, registerField, hiddenMap } = useContext(JsonEditorFormContext);
  const needHtmlFor = schema.type === 'boolean' && schema.format === 'checkbox';
  const hasError = meta.errors.length;
  const format = schema.parent?.format;

  const onChange = (...rest: any) => {
    const [event] = rest;

    notify && notify(meta.name, getValue(event));
    return control.onChange(...rest);
  };

  useEffect(() => {
    const cancelRegisterField = registerField && registerField(meta.name, schema);
    return () => {
      console.log('___path.cancelRegisterField', meta.name);
      cancelRegisterField && cancelRegisterField(meta.name);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ctrl = { ...control, onChange };

  const childNode =
    typeof children === 'function' //
      ? children(ctrl, meta, form)
      : React.cloneElement(children as React.ReactElement, { ...ctrl });
  // console.log('___handlers.schema', schema);

  if (hiddenMap && hiddenMap[meta.name.join('.')]) return null;

  // 适配 antd 3.x
  return (
    <div className={classnames('je-field ant-row ant-form-item', { 'has-error': hasError })}>
      {format !== 'table_row' && (
        <div className='ant-col ant-form-item-label'>
          <label htmlFor={(needHtmlFor && meta.name.join('.')) || undefined} className={classnames({ 'ant-form-item-required': required })}>
            {label || name}
          </label>
        </div>
      )}
      <div className='ant-col ant-form-item-control-wrapper'>
        <div className='ant-form-item-control'>
          <div className='ant-form-item-children'>{childNode}</div>
          <FieldError>{meta.errors}</FieldError>
        </div>
      </div>
    </div>
  );
};

const LabelField: React.FC<LabelFieldProps> = ({ name, label, children, schema, rules, ...rest }) => {
  const mergedRules: Rule[] = [...(getRules(schema, getNamePath(name || [])) || []), ...(rules || [])];
  const required = mergedRules.some((rule: any) => rule.required);

  return (
    <Field name={name} rules={mergedRules} {...rest}>
      {(control, meta, form) => {
        // console.log('LabelFieldLabelField', control, meta, form);
        return <Control {...{ control, meta, form, required, schema, label, children }} />;
      }}
    </Field>
  );
};

export default React.memo(LabelField);
