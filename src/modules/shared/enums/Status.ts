import { EnumerableObject } from "../types/EnumerableObject";

export enum Status {
  pending = "PENDENTE",
  resolved = "FINALIZADA",
}

function toString(status: Status): string {
  return statusStrings[status];
}

function allObjects(): EnumerableObject[] {
  return Object.entries(statusStrings).map(([value, name]) => ({
    value: value,
    name,
  }));
}

const statusStrings = {
  [Status.pending]: "Pendente",
  [Status.resolved]: "Atendida",
};

export default {
  toString,
  allObjects,
};
