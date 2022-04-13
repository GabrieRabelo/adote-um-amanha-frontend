import { diff } from "deep-object-diff";

export function areEqual(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
): boolean {
  const changes = diff(obj1, obj2);
  return !Object.keys(changes).length;
}
