import { resolve, sep } from 'node:path';

export function resolvePreparationPath(root, requestedPath) {
  if (!requestedPath || !/^candidaturas\/[a-z0-9-]+\/preparacao\/[a-z0-9-]+\.md$/.test(requestedPath)) return null;
  const candidaturasDir = resolve(root, 'candidaturas');
  const path = resolve(root, ...requestedPath.split('/'));
  return path.startsWith(`${candidaturasDir}${sep}`) ? path : null;
}
