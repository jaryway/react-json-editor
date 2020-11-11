import { InternalNamePath } from 'rc-field-form/es/interface';

export function containsNamePath(namePathList: InternalNamePath[], namePath: InternalNamePath) {
  return namePathList && namePathList.some((path) => matchNamePath(path, namePath));
}

export function matchNamePath(namePath: InternalNamePath, changedNamePath: InternalNamePath | null) {
  if (!namePath || !changedNamePath || namePath.length !== changedNamePath.length) {
    return false;
  }
  return namePath.every((nameUnit, i) => changedNamePath[i] === nameUnit);
}
