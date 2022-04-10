export enum Status {
  peding,
  resolved,
}

function toString(status: Status): string {
  return statusStrings[status];
}

const statusStrings = {
  [Status.peding]: "Pendente",
  [Status.resolved]: "Atendida",
};

export default {
  toString,
};
