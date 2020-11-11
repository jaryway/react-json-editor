var object = function object(schema) {
  return !schema.type && schema.properties ? 'object' : undefined;
};

var primitive = function primitive(schema) {
  return typeof schema.type === 'string' ? schema.type : undefined;
};

var defaultResolver = function defaultResolver(schema) {
  return typeof schema.type !== 'string' ? 'string' : undefined;
};

var arraysOfStrings = function arraysOfStrings(schema) {
  if (schema.type === 'array' && schema.items && !Array.isArray(schema.items) && ['string', 'number', 'integer'].includes(schema.items.type)) {
    if (schema.uniqueItems) {
      if (schema.format !== 'table') return 'multiselect';
    }
  }
};

var number = function number(schema) {
  return typeof schema.type === 'string' && schema.type === 'number' ? 'integer' : undefined;
};

var _boolean = function _boolean(schema) {
  if (schema.type === 'boolean') {
    if (schema.format === 'checkbox' || schema.options && schema.options.checkbox) return 'checkbox';
    return 'select';
  }
};

var enumeratedProperties = function enumeratedProperties(schema) {
  if (schema["enum"]) {
    if (schema.type === 'number' || schema.type === 'integer' || schema.type === 'string') {
      if (schema.format === 'radio') return 'radio';
      return 'select';
    }
  }
};

export var resolvers = [number, _boolean, arraysOfStrings, enumeratedProperties, primitive, object, defaultResolver];