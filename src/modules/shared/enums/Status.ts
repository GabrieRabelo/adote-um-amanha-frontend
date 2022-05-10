import { EnumerableObject } from "../types/EnumerableObject";

export enum Status {
  pending = "PENDENTE",
  resolved = "FINALIZADA",
  match = "MATCH_PENDENTE",
}

function toString(status: Status): string {
  return statusStrings[status];
}

function getIcon(status: Status): string {
  return statusIcons[status];
}

function getIconColor(status: Status): string {
  return statusIconColor[status];
}

function allObjects(): EnumerableObject[] {
  return Object.entries(statusStrings).map(([value, name]) => ({
    value: value,
    name,
    icon: statusIcons[value as Status],
  }));
}

const statusStrings = {
  [Status.pending]: "Pendente",
  [Status.resolved]: "Atendida",
  [Status.match]: "Em Match",
};

const statusIcons = {
  [Status.pending]: "mdi-dots-horizontal-circle",
  [Status.resolved]: "mdi-checkbox-marked-circle-outline",
  [Status.match]: "mdi-handshake",
};

const statusIconColor = {
  [Status.pending]: "#FFAA5A",
  [Status.resolved]: "#3BB54A",
  [Status.match]: "#FFAA5A",
};

export default {
  toString,
  allObjects,
  getIcon,
  getIconColor,
};
