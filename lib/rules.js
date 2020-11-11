"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRules = exports.rules = void 0;

var _resolvers = require("./resolvers");

var number = function number(schema, classname) {
  var rules = [];
  var min = schema.min,
      max = schema.max;
  if (classname !== 'number') return [];
  if (min !== undefined && min !== null) rules.push({
    type: 'number',
    min: min
  });
  if (max !== undefined && max !== null) rules.push({
    type: 'number',
    max: max
  });
  return rules;
};

var string = function string(schema, classname, name) {
  var thisname = name.slice(-1)[0];
  var rules = [];
  var minLength = schema.minLength,
      maxLength = schema.maxLength,
      pattern = schema.pattern,
      parent = schema.parent;
  if (classname !== 'string') return rules;

  if (parent && parent.required) {
    var required = parent === null || parent === void 0 ? void 0 : parent.required.includes(thisname);
    rules.push({
      required: required,
      message: '必填项'
    });
  }

  if (minLength !== undefined && minLength !== null) rules.push({
    type: 'string',
    min: minLength
  });
  if (maxLength !== undefined && maxLength !== null) rules.push({
    type: 'string',
    max: maxLength
  });

  if (schema.format) {
    if (schema.format === 'email') rules.push({
      type: 'email'
    });
    if (schema.format === 'url') rules.push({
      type: 'url'
    });
    if (schema.format === 'date' || schema.format === 'datetime') rules.push({
      type: 'date'
    });
  }

  if (pattern) rules.push({
    type: 'string',
    pattern: new RegExp(pattern)
  });
  return rules;
};

var array = function array(schema, classname) {
  var rules = [];
  var minItems = schema.minItems,
      maxItems = schema.maxItems,
      uniqueItems = schema.uniqueItems;
  if (classname !== 'array') return rules;
  if (minItems && minItems > 0) rules.push({
    type: 'array',
    min: minItems
  });
  if (maxItems && maxItems > 0) rules.push({
    type: 'array',
    max: maxItems
  });

  if (uniqueItems) {
    rules.push({
      type: 'array',
      validator: function validator(_, value, cb) {
        var seen = {};

        for (var i = 0; i < value.length; i++) {
          var valid = JSON.stringify(value[i]);

          if (seen[valid]) {
            return cb('存在重复项');
          }

          seen[valid] = true;
        }

        return Promise.resolve();
      }
    });
  }

  return rules;
};

var rules = [string, number, array];
exports.rules = rules;

var getRules = function getRules(schema, name) {
  var classname;

  _resolvers.resolvers.find(function (resolver) {
    classname = resolver(schema);
    return classname;
  });

  if (!classname) return [];
  var result = [];
  rules.find(function (resolver) {
    result = resolver(schema, classname, name);
    return result;
  });
  return result;
};

exports.getRules = getRules;