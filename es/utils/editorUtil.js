export var getEditorClass = function getEditorClass(schema, resolvers, editors) {
  var classname;
  resolvers.find(function (resolver) {
    classname = resolver(schema);
    return classname && editors[classname];
  });
  if (!classname) throw new window.Error("Unknown editor for schema ".concat(JSON.stringify(schema)));
  if (!editors[classname]) throw new window.Error("Unknown editor  ".concat(classname));
  return editors[classname];
};