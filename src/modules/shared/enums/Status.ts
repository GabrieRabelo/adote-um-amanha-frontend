export enum Status {
  peding = "PENDENTE",
  resolved = "FINALIZADA",
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
