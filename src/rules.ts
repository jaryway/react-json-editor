// import v from 'asy'
import { Schema } from './interfaces';
import { resolvers } from './resolvers';
import { InternalNamePath, Rule } from 'rc-field-form/es/interface';

const number = (schema: Schema, classname: string) => {
  let rules: Rule[] = [];
  const { min, max } = schema;

  if (classname !== 'number') return [];

  if (min !== undefined && min !== null) rules.push({ type: 'number', min });
  if (max !== undefined && max !== null) rules.push({ type: 'number', max });

  return rules;
};

const string = (schema: Schema, classname: string, name: InternalNamePath) => {
  const thisname = name.slice(-1)[0];
  const rules: Rule[] = [];
  const { minLength, maxLength, pattern, parent } = schema;

  if (classname !== 'string') return rules;

  // 父级中定义为必填的字段
  if (parent && parent.required) {
    const required = parent?.required.includes(thisname);
    rules.push({ required, message: '必填项' });
  }

  // console.log('getRules', schema, classname, name);

  if (minLength !== undefined && minLength !== null) rules.push({ type: 'string', min: minLength });
  if (maxLength !== undefined && maxLength !== null) rules.push({ type: 'string', max: maxLength });

  if (schema.format) {
    if (schema.format === 'email') rules.push({ type: 'email' });
    if (schema.format === 'url') rules.push({ type: 'url' });
    if (schema.format === 'date' || schema.format === 'datetime') rules.push({ type: 'date' });
  }

  if (pattern) rules.push({ type: 'string', pattern: new RegExp(pattern) });

  return rules;
};

const array = (schema: Schema, classname: string) => {
  const rules: Rule[] = [];
  const { minItems, maxItems, uniqueItems, uniqueItemFields } = schema;
  // console.log('getRules-uniqueItems');
  if (classname !== 'array') return rules;

  if (minItems && minItems > 0) rules.push({ type: 'array', min: minItems });
  if (maxItems && maxItems > 0) rules.push({ type: 'array', max: maxItems });

  if (uniqueItems) {
    // console.log('getRules-uniqueItems');
    rules.push({
      type: 'array',
      validator: (_, value, cb) => {
        console.log('getRules-validator', value);

        const seen: any = {};
        const _value = (value || []).map((m: any) => {
          // 只验证指定的字段
          if (uniqueItemFields && uniqueItemFields.length > 0 && m !== undefined) {
            let v: any = {};
            uniqueItemFields.forEach((f) => (v[f] = m[f]));
            return v;
          }
          return m;
        });

        for (let i = 0; i < _value.length; i++) {
          const valid = JSON.stringify(_value[i]);
          if (seen[valid]) {
            return cb(`存在重复项`);
          }
          seen[valid] = true;
        }

        return Promise.resolve();
      },
    });
  }

  return rules;
};

export const rules = [array, string, number];

export const getRules = (schema: Schema, name: InternalNamePath) => {
  let classname: string | undefined;

  resolvers.find((resolver) => {
    classname = resolver(schema);
    return classname;
  });
  // console.log('getRules', schema, classname);
  if (!classname) return [];
  let result: Rule[] = [];

  // console.log('getRules11', schema, classname);

  rules.find((resolver) => {
    result = resolver(schema, classname as string, name);
    if (result.length > 0) return result;
  });

  return result;
};
