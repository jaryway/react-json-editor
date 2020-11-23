import { Schema, Resolver } from './interfaces';

// /* Use "multiple" as a fall back for everything */
// const defaultResolver = schema => typeof schema.type !== 'string' && 'multiple'

// 没有 type 属性，但有 properties
/* If the type is not set but properties are defined, we can infer the type is actually object */
const object: Resolver = (schema: Schema) => (!schema.type && schema.properties ? 'object' : undefined);

/* If the type is set and it's a basic type, use the primitive editor */
// 原始，默认返回 type
const primitive: Resolver = (schema: Schema) => (typeof schema.type === 'string' ? schema.type : undefined);

const defaultResolver: Resolver = (schema: Schema) => (typeof schema.type === 'string' ? 'string' : undefined);

/* Specialized editors for arrays of strings */
const arraysOfStrings: Resolver = (schema: Schema) => {
  // console.log('arraysOfStrings',schema);
  if (schema.type === 'array' && schema.items && !Array.isArray(schema.items) && ['string', 'number', 'integer'].includes(schema.items.type)) {
    // if (schema.format === 'choices') return 'arrayChoices';
    if (schema.uniqueItems) {
      /* if 'selectize' enabled it is expected to be selectized control */
      // if (schema.format === 'selectize') return 'arraySelectize';
      // if (schema.format === 'select2') return 'arraySelect2';
      if (schema.format !== 'table') return 'multiselect'; /* otherwise it is select */
    }
  }
};

/* If the type is set and it's a basic type, use the primitive editor */
const number: Resolver = (schema: Schema) => (typeof schema.type === 'string' && schema.type === 'number' ? 'integer' : undefined);

const hidden: Resolver = (schema: Schema) => (typeof schema.type === 'string' && schema.format === 'hidden' ? 'hidden' : undefined);

/* Use the select editor for all boolean values */
const boolean: Resolver = (schema: Schema) => {
  if (schema.type === 'boolean') {
    /* If explicitly set to 'checkbox', use that */
    if (schema.format === 'checkbox' || (schema.options && schema.options.checkbox)) return 'checkbox';
    /* Otherwise, default to select menu */
    //   if (schema.format === 'select2') return 'select2';
    //   if (schema.format === 'selectize') return 'selectize';
    //   if (schema.format === 'choices') return 'choices';
    // console.log('booleanbooleanboolean');
    return 'select';
  }
};

/* Use the `enum` or `select` editors for schemas with enumerated properties */
const enumeratedProperties: Resolver = (schema: Schema) => {
  if (schema.enum) {
    // if (schema.type === 'array' || schema.type === 'object') return 'enum';
    if (schema.type === 'number' || schema.type === 'integer' || schema.type === 'string') {
      // console.log('enumeratedProperties', schema.type);
      if (schema.format === 'radio') return 'radio';
      // if (schema.format === 'checkbox') return 'select2'
      // if (schema.format === 'selectize') return 'selectize'
      // if (schema.format === 'choices') return 'choices'
      return 'select';
    }
  }
};

// 基本数据对象 string、number、null、undefined
export const resolvers = [number, boolean, hidden, arraysOfStrings, enumeratedProperties, primitive, object, defaultResolver];
