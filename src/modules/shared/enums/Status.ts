export enum Status {
  pending = "PENDENTE",
  resolved = "FINALIZADA",
}

function toString(status: Status): string {
  return statusStrings[status];
}

const statusStrings = {
  [Status.pending]: "Pendente",
  [Status.resolved]: "Atendida",
};

export default {
  toString,
};
