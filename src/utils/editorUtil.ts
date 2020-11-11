import { Schema, Resolver } from '../interfaces';

export const getEditorClass = (schema: Schema, resolvers: Resolver[], editors: { [k: string]: any }) => {
  let classname: string | undefined;

  resolvers.find((resolver) => {
    classname = resolver(schema);
    return classname && editors[classname];
  });
  console.log('classname', schema, classname);

  if (!classname) {
    console.error(new window.Error(`Unknown editor for schema ${JSON.stringify(schema)}`));
    return undefined;
  }

  if (!editors[classname]) {
    console.error(new window.Error(`Unknown editor  ${classname}`));
  }

  return editors[classname];
};

// export const getRu
