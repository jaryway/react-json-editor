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
  const { minItems, maxItems, uniqueItems } = schema;

  if (classname !== 'array') return rules;

  if (minItems && minItems > 0) rules.push({ type: 'array', min: minItems });
  if (maxItems && maxItems > 0) rules.push({ type: 'array', max: maxItems });

  if (uniqueItems) {
    rules.push({
      type: 'array',
      validator: (_, value, cb) => {
        const seen: any = {};

        for (let i = 0; i < value.length; i++) {
          const valid = JSON.stringify(value[i]);
          if (seen[valid]) {
            return cb('存在重复项');
          }
          seen[valid] = true;
        }

        return Promise.resolve();
      },
    });
  }

  return rules;
};

export const rules = [string, number, array];

export const getRules = (schema: Schema, name: InternalNamePath) => {
  let classname: string | undefined;

  resolvers.find((resolver) => {
    classname = resolver(schema);
    return classname;
  });

  if (!classname) return [];
  let result: Rule[] = [];

  rules.find((resolver) => {
    result = resolver(schema, classname as string, name);
    return result;
  });

  return result;
};
